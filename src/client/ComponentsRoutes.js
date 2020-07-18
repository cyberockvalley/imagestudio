import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Contact from './components/Contact'
import Blog from './components/Blog'
import About from './components/About'
import Reviews from './components/Reviews'
import SingleBlogPost from './components/SingleBlogPost'
import Videos from './components/Videos'
import WeddingPhotos from './components/WeddingPhotos'
import WeddingStories from './components/WeddingStories'
import SingleWeddingStory from './components/SingleWeddingStory'
import Shop from './components/Shop'
import SingleProduct from './components/SingleProduct'
import Movies from './components/Movies'
import FileUpload from './components/admin/FileUpload'
import AdminHome from './components/admin/AdminHome'
import SingleBlogSpool from './components/SingleBlogSpool'

const ComponentsRoutes = (props) => (
  <Switch className="App">
    <Route exact path="/" 
      render={(propz) => <Home {...propz} data={props.initialData} />}
    />
    <Route exact path="/contact" 
      render={(propz) => <Contact {...propz} data={props.initialData} />}
    />
    <Route exact path="/blog" 
      render={(propz) => <Blog {...propz} data={props.initialData} />}
    />
    <Route exact path="/blog/:title" 
      render={(propz) => <SingleBlogPost {...propz} data={props.initialData} />}
    />
    <Route exact path="/about" 
      render={(propz) => <About {...propz} data={props.initialData} />}
    />
    <Route exact path="/reviews" 
      render={(propz) => <Reviews {...propz} data={props.initialData} />}
    />
    <Route exact path="/videos(|/music|/commercial)" 
      render={(propz) => <Videos {...propz} data={props.initialData} />}
    />
    <Route exact path="/portfolio" 
      render={(propz) => <WeddingPhotos {...propz} data={props.initialData} />}
    />
    <Route exact path="/photo" 
      render={(propz) => <WeddingStories {...propz} data={props.initialData} />}
    />
    <Route exact path="/shop" 
      render={(propz) => <Shop {...propz} data={props.initialData} />}
    />
    <Route exact path="/movies" 
      render={(propz) => <Movies {...propz} data={props.initialData} />}
    />
    <Route exact path="/admin" 
      render={(propz) => <AdminHome {...propz} data={props.initialData} />}
    />
    <Route exact path="/upload-test" 
      render={(propz) => <FileUpload {...propz} data={props.initialData} />}
    />
    <Route exact path="/:title" 
      render={(propz) => <SingleBlogSpool {...propz} data={props.initialData} />}
    />
    <Route exact path="/product/:title" 
      render={(propz) => <SingleProduct {...propz} data={props.initialData} />}
    />
  </Switch>
)

export default ComponentsRoutes