import { FILE_PATHS, DB_FILE_PATHS } from "../utils/Paths"

const express = require("express")
const CacheRoute = express.Router()


CacheRoute.get(FILE_PATHS.concat(DB_FILE_PATHS), (req, res, next) => {
    res.cacheHeadersMaxAge = 31557600
    next()
})
CacheRoute.use("*", (req, res, next) => {
    if(req.originalUrl.startsWith("/client/")) {
        res.cacheHeadersMaxAge = 31557600
    }
    res.set('Cache-Control', `public, max-age=${res.cacheHeadersMaxAge || 3600 }`)
    next()
})

export default CacheRoute