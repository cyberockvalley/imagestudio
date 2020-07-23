import { WEB_PAGE_IMAGES_ENDPOINT } from "../both/Constants"
import Axios from "axios"
import da from "../client/components/widgets/word/translations/da"

const express = require("express")
const SecondaryApi = express.Router()

SecondaryApi.get("/" + WEB_PAGE_IMAGES_ENDPOINT, (req, res) => {
    const reg = /((?:https?:\/\/[a-zA-z0-9\/_\.-]+|[%a-zA-z0-9\/_\.-]+)[a-zA-z0-9\/_-]+\.(?:jpg|jpeg|png))/ig
    var url = req.query.url
    if(!url || url.length == 0) {
        res.send({result: []})

    } else {
        Axios.get(decodeURI(url))
        .then(response => {
            var page = response.data
            //page = page.substring(page.indexOf('<div class="blog-content">'))
            var images = page.match(reg)
            var result = []
            images.forEach(image => {
                if(!result.includes(image) && !image.includes("%")) {
                    result.push(image)
                }
            })
            res.send({result: result})
        })
        .catch(e => {
            res.send({result: "An error occured"})
        })
    }
})

export default SecondaryApi