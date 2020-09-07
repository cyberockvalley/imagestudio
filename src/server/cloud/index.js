const { default: Axios } = require("axios")
const qs = require('querystring')
const cloudFunctions = require("./functions")


const BOT_TOKEN_VERIFICATION_ENDPOINT = "https://www.google.com/recaptcha/api/siteverify"
const STATUS = {
    success: 0,
    failed: 1
}
const ERROR = {
    types: {
        action: 0
    },
    codes: {
        action: {
            bot_check_token_missing: 1,
            bot_check_token_failed: 2,
            missing_data: 3,
            request_catch: 4,
            may_be_bot: 5
        }
    }
}
const urlEncodedFormConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
}
Parse.Cloud.define('hello', (req, res) => {
    return 'Hi';
})
//https://graph.instagram.com/me?&fields=username,id,account_type,media_count&access_token=
Parse.Cloud.define('instagramPosts', (req, res) => {
    //get instagram_access_token from TextElement
    var q1 = new Parse.Query(Parse.Object.extend("TextElement"))
    q1.equalTo("key", "instagram_access_token")

    var q2 = new Parse.Query(Parse.Object.extend("TextElement"))
    q2.equalTo("key", "instagram_id")
    
    var q = Parse.Query.or(q1, q2);
    q.limit(2)
    return q.find({useMasterKey: true})
    .then(element => {
        if(element && Array.isArray(element) && element.length == 2) {
            //fields => id,code,caption,media_type,media_url
            var fields = ["media_type", "media_url", "permalink"]
            var instaId = element[0].get("key") == "instagram_id"? element[0].get("data") : element[1].get("data")
            var instagramAccessToken = element[0].get("key") == "instagram_access_token"? element[0].get("data") : element[1].get("data")
            //console.log("instagramAccessToken", instagramAccessToken)
            return Axios.get( `https://graph.instagram.com/${instaId}/media?limit=6&fields=${fields.join()}&access_token=${instagramAccessToken}`)
            .then(response => {
                return response.data.data

            })
            .catch(e => {
                return {error: e}
            })

        } else {
            return {error: "No value"}
        }
    })
    .catch(e => {
        return {error: "No value2"}

    })
})

Parse.Cloud.define('contactMail', async (req, res) => {
    var name = req.params.name
    var email = req.params.email
    var phone = req.params.phone
    var message = req.params.message
    var hasError = false
    var errorMessage = {}

    if(!req.params.botToken || req.params.botToken.length == 0) {
        return {success: false, error: "Sorry. Couldn't send your message."}
    }

    if(!name || name.length == 0) {
        errorMessage.name = "Please enter your name"; hasError = true
    }

    if(!email || email.length == 0) {
        errorMessage.email = "Please enter your email address"; hasError = true

    } else if(!cloudFunctions.list.isValidEmail(email)) {
        errorMessage.email = "Please enter a valid email address"; hasError = true
    }

    if(phone && phone.length > 0 && !cloudFunctions.list.isValidPhone(phone)) {
        errorMessage.phone = "Please enter a valid phone number"; hasError = true
    }

    if(!message || message.length == 0) {
        errorMessage.message = "Please enter your message"; hasError = true
    }

    if(hasError) {
        //console.log("contactServer", "hasError", true)
        return {success: false, errors: errorMessage, hasError: true}

    } else {
        var botCheck = await cloudFunctions.list.botChecker(req.params.botToken)
        if(!botCheck.success || botCheck.score <= 0.5) {
            return {success: false, error: "Sorry. Couldn't send your message now."}

        } else {
            var EmailAdapter = require("parse-server-dedicated-email-adapter")
            var mailAdapter = EmailAdapter({
                host: 'mail.imagestudio.com',
                port: 465,
                secure: true,
                // The address that your emails come from
                email: 'contact@imagestudio.com',
                password: process.env.AUTO_MAIL_SERVER_PASSWORD
            })
            return mailAdapter.sendMail({
                from: 'ImageStudio <contact@imagestudio.com>',
                to: 'info@imagestudio.com',
                replyTo: email,
                subject: "Contact Page Message",
                html: `<div style="padding: 15px;">
                    <div style="margin-bottom: 15px;text-align:center"><h1>Image Studio Contact Message From ${cloudFunctions.list.escapeHtml(name)}</div>
                    <div style="margin-bottom: 15px"><b>Email address: </b> ${cloudFunctions.list.escapeHtml(email)}</div>
                    ${cloudFunctions.list.isValidPhone(phone)? '<div style="margin-bottom: 15px"><b>Telephone: </b> ' + cloudFunctions.list.escapeHtml(phone) + '</div>' : ""}
                    <div style="margin-bottom: 15px">
                        <p>
                            ${message}
                        </p>
                    </div>
                </div>`
            })
            .then(r => {
                //console.log("contactServer", "then", r)
                return {success: true, message: "ok"}
            })
            .catch(e => {
                //console.log("contactServer", "catch", e)
                return {success: false, errors: "An error occured", tScore: botCheck.score}
            })
        }
    }
    
})

Parse.Cloud.define("getRatings", (request, response) => {
    //Query class appointments
    var Class = Parse.Object.extend('Page')
    var query = new Parse.Query(Class)
    var key = request.params.key || request.params.local_key
    if(key) {
        query.equalTo(request.params.key? "key" : "local_key", request.params.key || request.params.local_key);
        return query.find()
        .then(results => {
            var sum = 0;
            for (var i = 0; i < results.length; i++) {
            sum += results[i].get("ratings");
            }
            //console.log("getRatings:", sum, results.length)
            return {sum: sum, count: results.length}
        })
        .catch(e => {
            return {sum: 0, count: 0}
        })

    } else {
        return {sum: 0, count: 0}
    }
  
})
Parse.Cloud.define("getLikes", (request, response) => {
    //Query class appointments
    var Class = Parse.Object.extend('Page')
    var query = new Parse.Query(Class)
    var key = request.params.key || request.params.local_key
    if(key) {
        query.equalTo(request.params.key? "key" : "local_key", request.params.key || request.params.local_key);
        return query.first()
        .then(results => {
            return {count: results.get("likes")}
        })
        .catch(e => {
            return {count: 0}
        })

    } else {
        return {count: 0}
    }
  
})


Parse.Cloud.beforeSave('Page', cloudFunctions.list.beforeSave(Parse, 'Page'))
Parse.Cloud.beforeSave('Page', cloudFunctions.list.afterSave(Parse, 'Page'))

Parse.Cloud.beforeSave('TextElement', cloudFunctions.list.beforeSave(Parse, 'TextElement'))

Parse.Cloud.beforeSave('ImageElement', cloudFunctions.list.beforeSave(Parse, 'ImageElement'))

Parse.Cloud.beforeSave('ImageData', cloudFunctions.list.beforeSave(Parse, 'ImageData'))

Parse.Cloud.beforeSave('File', cloudFunctions.list.beforeSave(Parse, 'File'))

Parse.Cloud.define('pageReactionUpdate', (req, res) => {
    const user = req.user
    //const userId = user.id
    const actionInfo = req.params.info
    const botCheckToken = req.params.bot_check_token
    if(actionInfo && actionInfo.pageId && actionInfo.type) {
        if(!botCheckToken) {
            return {status: STATUS.failed, error_type: ERROR.types.action, error_code: ERROR.codes.action.bot_check_token_missing}
    
        } else {
            return Axios.post(BOT_TOKEN_VERIFICATION_ENDPOINT, qs.stringify({
                secret: process.env.BOT_TOKEN_VERIFICATION_SECRET_KEY,
                response: botCheckToken
            }), urlEncodedFormConfig)
            .then(response => {
                if(response.data.success && response.data.score > 0.5) {
                    //log action here
                    //console.log("pageReactionUpdate", "PageId", actionInfo.pageId)
                    cloudFunctions.list.updateCounter(Parse, "Page", {likes: 1}, actionInfo.pageId)
                    return {status: STATUS.success}

                } else {
                    return {status: STATUS.failed, error_type: ERROR.types.action, error_code: ERROR.codes.action.may_be_bot}
                }
            })
            .catch(e => {
                return {status: STATUS.failed, error_type: ERROR.types.action, error_code: ERROR.codes.action.request_catch}
            })
        }

    } else {
        return {status: STATUS.failed, error_type: ERROR.types.action, error_code: ERROR.codes.action.missing_data}
    }
    
})

//update users counter
Parse.Cloud.afterSave('_User', (req, res) => {
    var UsersCount = Parse.Object.extend('UsersCount')
    var query = new Parse.Query(UsersCount)
    query.first()
    .then(total => {
        total.increment("count")
        total.save()
    })
})
Parse.Cloud.afterDelete('_User', (req, res) => {
    var UsersCount = Parse.Object.extend('UsersCount')
    var query = new Parse.Query(UsersCount)
    query.first()
    .then(total => {
        total.decrement("count")
        total.save()
    })
})
//update products counter
Parse.Cloud.afterSave('Product', (req, res) => {
    var ProductsCount = Parse.Object.extend('ProductsCount')
    var query = new Parse.Query(ProductsCount)
    query.first()
    .then(total => {
        total.increment("count")
        total.save()
    })
})
Parse.Cloud.afterDelete('Product', (req, res) => {
    var ProductsCount = Parse.Object.extend('ProductsCount')
    var query = new Parse.Query(ProductsCount)
    query.first()
    .then(total => {
        total.decrement("count")
        total.save()
    })
})

Parse.Cloud.define('getRoles', async (request) => {
    const query = await new Parse.Query(Parse.Role).equalTo('users', request.user).find()
    return query
})

var userHasRole = (username, rolename) => {
    Parse.Cloud.useMasterKey();
    var queryRole = new Parse.Query(Parse.Role);
    queryRole.equalTo('name', rolename);
    return queryRole.first({useMasterKey:true})
      .then((roleObject) => {
        var queryForUsername = roleObject.relation('users').query();
        queryForUsername.equalTo('username', username)
        return queryForUsername.first({useMasterKey:true})
          .then((userObject) => {
            if(userObject){
              console.log(username + ' has role: ' + rolename);
              return Parse.Promise.as(true);
            }
            else{
              console.log(username + ' does not have role: ' + rolename);
              return Parse.Promise.as(false);
            }
          });
      });
}

Parse.Cloud.define('hasRole', (request, response) => {
    //console.log("hasRole", req.user, Parse.User.current())
    if(!Parse.User.current()){
        response.success(false)

    } else {
      userHasRole(request.params.parseSessionToken, req.params.role)
        .then((hasRole) => {
          if(hasRole){
            response.success(true);
          }else{
            response.success(false);
          }
        })
        .catch(error => {
            console.error('Request failed: ' + JSON.stringify(error,null,2));
            response.error('Request failed: ' + JSON.stringify(error,null,2));
        })
    }
})
