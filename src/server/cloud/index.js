const { default: Axios } = require("axios")
const qs = require('querystring')


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
Parse.Cloud.define('hello', function(req, res) {
    return 'Hi';
})
//https://graph.instagram.com/me?&fields=username,id,account_type,media_count&access_token=
Parse.Cloud.define('instagramPosts', function(req, res) {
    var accessToken = "IGQVJWaUNlNW9ydUpVRUFIaUtwMU5qQW9ZAV1FLVC14MVN2LWdhV3ZAyZAGk4aG9NbmFKVFY3aGloLUlNaGxTSnI1bjFNcC1ZAalhpMUdNM3BhSTRCYnByNmw0Tzl6VWxCZAjNQRHNPQjEzVFpqSUM2YTdVYgZDZD"
    //firlds => id,code,caption,media_type,media_url
    var fields = ["media_type", "media_url", "permalink"]
    var instaId = "17841403997008138"
    return Axios.get( `https://graph.instagram.com/${instaId}/media?limit=6&fields=${fields.join()}&access_token=${accessToken}`)
    .then(response => {
        return response.data.data

    })
    .catch(e => {
        return {error: e}
    })
    
})

Parse.Cloud.define('pageReactionUpdate', function(req, res) {
    const user = req.user
    console.log("ReqUser", user, req.user)
    //const userId = user.id
    const actionInfo = req.params.info
    const actionData = req.params.data
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
