const Axios = require("axios");
const { response } = require("express");

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
