const { default: Axios } = require("axios")
const qs = require('querystring')

const BOT_TOKEN_VERIFICATION_ENDPOINT = "https://www.google.com/recaptcha/api/siteverify"
const urlEncodedFormConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
}

const sanitizeObject = (object, schema) => {
    var dirtyKeys = object.dirtyKeys()
    for( var key in dirtyKeys ) {
        if( !schema.fields.hasOwnProperty(dirtyKeys[key]) ) {
            //console.log("sanitizeObject1:", 1, dirtyKeys[key])
            object.unset(dirtyKeys[key])
        }
    }
    //console.log("sanitizeObject1:", 2, JSON.stringify(object))
}

const updateCounter = (Parse, className, fields, objectId) => {
    var q = new Parse.Query(Parse.Object.extend(className))
    q.get(objectId)
    .then(object => {
        if(object) {
            Object.keys(fields).forEach((key, index) => {
                object.set(key, object.get(key)? object.get(key) + fields[key] : fields[key])
            })
            object.save(null, { useMasterKey: true })
            .then(r => {}).catch(e => {})
        }
    })
    .catch(e => {
        //console.log("updateCounter:", 3, e)

    })

}

const isValidEmail = email => {
    //console.log("isValidEmail", email, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    return email? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) : false
}

const isValidPhone = phone => {
    if(!phone) return false
    return true
}

const escapeHtml = (unsafe) => {
    if(!unsafe) return unsafe
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

const botChecker = async botToken => {
    var response = await Axios.post(BOT_TOKEN_VERIFICATION_ENDPOINT, qs.stringify({
        secret: process.env.BOT_TOKEN_VERIFICATION_SECRET_KEY,
        response: botToken
    }), urlEncodedFormConfig)

    return {success: response.data.success, score: response.data.score}
}

module.exports.list = {
    beforeSave: (Parse, className) => {
        return async req => {
            try {
                var schema = await new Parse.Schema(className).get()
                const user = req.user
                let object = req.object
                var extras = req.context
                parentId = extras? extras.parentId : null
                if(className != "ImageData" && !user && (!extras || !extras.botToken || extras.botToken.length == 0)) {
                    throw "no auth"
        
                } else if(className != "ImageData" && !user) {
                    try {
                        var response = await botChecker(extras.botToken)
                        if(response.success && response.score > 0.5) {
                            sanitizeObject(object, schema)
                            if(!user) {
                                var ACL = object.getACL()
                                if(!ACL) ACL = new Parse.ACL()
                                ACL.setPublicWriteAccess(false)
                                object.setACL(ACL)
                                Parse.Cloud.useMasterKey()
                            }
                        } else {
                            throw "likely bot"
                        }
                    } catch(e) {
                        throw "bot check error" + e
                    }
        
                } else {
                    sanitizeObject(object, schema)
                    if(!user) {
                        var ACL = object.getACL()
                        if(!ACL) ACL = new Parse.ACL()
                        ACL.setPublicWriteAccess(false)
                        object.setACL(ACL)
                        Parse.Cloud.useMasterKey()
                    }
                }
            } catch (e) {
                throw "error" + e
            }
            
        }
    },
    afterSave: (Parse, className) => {
        return req => {
            let object = req.object
            var extras = req.context
            parentId = extras? extras.parentId : null
            if(className == 'Page' && !req.original && object.get("ratings") && parentId) {
                updateCounter(Parse, "Page", {ratings_count: 1, ratings_sum: object.get("ratings")? object.get("ratings") : 0}, parentId)
            }
        }
    },
    updateCounter: updateCounter,
    botChecker: botChecker,
    isValidEmail: isValidEmail,
    isValidPhone: isValidPhone,
    escapeHtml: escapeHtml
}