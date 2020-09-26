import { PAGE_404 } from "../../both/Constants"
import About from "../../client/components/About"
import AdminHome from "../../client/components/admin/AdminHome"
import Login from "../../client/components/admin/Login"
import Register from "../../client/components/admin/Register"
import Blog from "../../client/components/Blog"
import Cart from "../../client/components/Cart"
import Contact from "../../client/components/Contact"
import Error404 from "../../client/components/errors/Error404"
import Home from "../../client/components/Home"
import LicenseInfo from "../../client/components/LicenseInfo"
import Movies from "../../client/components/Movies"
import Reviews from "../../client/components/Reviews"
import Shop from "../../client/components/Shop"
import SingleBlogSpool from "../../client/components/SingleBlogSpool"
import SingleProductSpool from "../../client/components/SingleProductSpool"
import SingleStorySpool from "../../client/components/SingleStorySpool"
import VideosCommercial from "../../client/components/VideoCommercial"
import VideosMusic from "../../client/components/VideoMusic"
import Videos from "../../client/components/Videos"
import WeddingPhotos from "../../client/components/WeddingPhotos"
import WeddingStories from "../../client/components/WeddingStories"

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

export const PathsComponents = [
    Home, Contact, About, Blog, Reviews, SingleBlogSpool,
    Videos, VideosMusic, VideosCommercial, 
    WeddingPhotos, //wedding photos
    WeddingStories, //stories
    SingleStorySpool,//blog, story
    Shop, SingleProductSpool, Movies, null,
    AdminHome, Register, Login,
    Cart, LicenseInfo,
    Error404
]

export const FILE_PATHS = [
    '/client/images/uploads/:year_folder/:month_folder/:filename', 
    '/client/images/uploads/:filename'
]

export const DB_FILE_PATHS = [
    '/parse/files/:appId/:filename', '/parse/files/:appId/metadata/:filename'
]

export default Paths