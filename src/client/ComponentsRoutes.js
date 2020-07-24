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
import Movies from './components/Movies'
import FileUpload from './components/admin/FileUpload'
import AdminHome from './components/admin/AdminHome'
import SingleBlogSpool from './components/SingleBlogSpool'
import SingleStorySpool from './components/SingleStorySpool'
import SingleProductSpool from './components/SingleProductSpool'

const $ = require('jquery')

class ComponentsRoutes extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    var sticky = $(".navbar-static-top")[0].offsetHeight
    // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
    $(window).on("scroll", e => {
      if (window.pageYOffset > sticky) {
        $(".navbar-static-top")[0].classList.add("fixed-top");
      } else {
        $(".navbar-static-top")[0].classList.remove("fixed-top");
      }
    })
  }

  render() {
    return (
      <Switch className="App">
        <Route exact path="/" 
          render={(propz) => <Home {...propz} data={this.props.initialData} />}
        />
        <Route exact path="/contact" 
          render={(propz) => <Contact {...propz} data={this.props.initialData} />}
        />
        <Route exact path="/blog" 
          render={(propz) => <Blog {...propz} data={this.props.initialData} />}
        />
        <Route exact path="/blog/:title" 
          render={(propz) => <SingleBlogSpool {...propz} data={this.props.initialData} />}
        />
        <Route exact path="/about" 
          render={(propz) => <About {...propz} data={this.props.initialData} />}
        />
        <Route exact path="/reviews" 
          render={(propz) => <Reviews {...propz} data={this.props.initialData} />}
        />
        <Route exact path="/videos(|/music|/commercial)" 
          render={(propz) => <Videos {...propz} data={this.props.initialData} />}
        />
        <Route exact path="/portfolio" 
          render={(propz) => <WeddingPhotos {...propz} data={this.props.initialData} />}
        />
        <Route exact path="/photo" 
          render={(propz) => <WeddingStories {...propz} data={this.props.initialData} />}
        />
        <Route exact path="/shop" 
          render={(propz) => <Shop {...propz} data={this.props.initialData} />}
        />
        <Route exact path="/movies" 
          render={(propz) => <Movies {...propz} data={this.props.initialData} />}
        />
        <Route exact path="/admin" 
          render={(propz) => <AdminHome {...propz} data={this.props.initialData} />}
        />
        <Route exact path="/upload-test" 
          render={(propz) => <FileUpload {...propz} data={this.props.initialData} />}
        />
        <Route exact path="/:title" 
          render={(propz) => <SingleStorySpool {...propz} data={this.props.initialData} />}
        />
        <Route exact path="/product/:title" 
          render={(propz) => <SingleProductSpool {...propz} data={this.props.initialData} />}
        />
      </Switch>
    )
  }
}

export default ComponentsRoutes