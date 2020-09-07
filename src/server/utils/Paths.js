import { PAGE_404 } from "../../both/Constants"

const Paths = [
    "/", "/contact", "/about", "/blog", "/reviews", "/blog/:title",
    "/videos", "/videos/music", "/videos/commercial", 
    "/portfolio", //wedding photos
    "/photo", //stories
    "/:title",//blog, story
    "/shop", "/product/:title", "/movies", "/upload-test",
    "/admin/", "/admin/up", "/admin/in",
    "/shop/cart", "/shop/license",
    PAGE_404
]

export const FILE_PATHS = [
    '/client/images/uploads/:year_folder/:month_folder/:filename', 
    '/client/images/uploads/:filename'
]

export const DB_FILE_PATHS = [
    '/parse/files/:appId/:filename', '/parse/files/:appId/metadata/:filename'
]

export default Paths