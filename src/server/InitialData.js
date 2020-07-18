
const express = require("express")
const InitialData = express.Router()

/*
import { SELL_PATHS, LOGIN_PATHS, REGISTER_PATHS, HOME_PATHS, PRODUCT_PATHS, SEARCH_PATHS, PRODUCTS_PATHS, CREATE_TIPS_PATHS } from "../utils/RoutePaths";
import { SITE_TITLE, SITE_NAME } from "../../../Constants";
import { getProduct } from "../components/UserFunctions";
import { productLink } from "../utils/LinkBuilder";
import { mimeFromFilename } from "../utils/Funcs";*/

InitialData.get("*", (req, res, next) => {
    res.locals.initialData = {
        user: null
    }
    next()
})

export default InitialData