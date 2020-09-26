import { matchPath } from "react-router-dom"
import { API_ROOT_DIR, BASE_URL } from "../both/Constants"
import Page from "../client/components/Page"
import ComponentsRoutes from "../client/ComponentsRoutes"
import Paths, {PathsComponents} from "./utils/Paths"

const express = require("express")
const InitialData = express.Router()

const ParseClient = require('parse/node')
ParseClient.initialize('123456A', '123456J')
ParseClient.serverURL = `${BASE_URL + API_ROOT_DIR}`


InitialData.get("*", async (req, res, next) => {/*
    var toMatch = req.path
    var page = {}
    var i = 0
    var hasMatch = Paths.some(route => {
        //page.match =example= { path: '/', url: '/', isExact: true, params: {} }
        //page.match =example2= { 
        //    path: '/:title',
        //    url: '/wedding-in-rome-irina-sam',
        //    isExact: true,
        //    params: { title: 'wedding-in-rome-irina-sam' } 
        //}
        page.match = matchPath(toMatch, {
            path: route, exact: true
        })
        if(page.match) {
            page.component = PathsComponents[i]
            return true

        } else {
            i++
            return false
        }
    })
    if(hasMatch) {
        const { getPageInfo } = page.component
        let state
        if(getPageInfo) {
            var pageInfo = getPageInfo(page.match.params, req.query)
            console.log("ComponentsRoutesZZ: ", pageInfo)
            state = pageInfo.name? await Page.getPageState(pageInfo, ParseClient) : null
        }

        //res.locals.state = state
        next()

    } else {
        next()
    }*/
    next()
})

export default InitialData