const dateFormat = require('dateformat')
import React from "react";
import HeaderImageBanner from "./HeaderImageBanner";
import { Helmet } from 'react-helmet'
import Page from "./Page";
import EditableStateContext from "./editables/EditableStateContext";
import { lastValueOrThis, truncText, slugify } from "../../both/Functions";
import { EMPTY_TEXT_ELEMENT_DATA } from "./editables/Editable";
import { HTML_DESCRIPTION_LENGTH, SEO_BASE_URL, ROLES, ROWS_PER_LIST } from "../../both/Constants";
import TextEditable from "./editables/TextEditable";
import PageReaction from "./widgets/PageReaction";
import { Link } from "react-router-dom";

class SingleStoryThread extends Page {
  static contextType = EditableStateContext
  constructor(props) {
    super(props)

    this.loadPrev = this.loadPrev.bind(this)
    this.loadNext = this.loadNext.bind(this)
  }

  componentDidMount() {
    this.setState({likes: 0})
    if(this.props.threadAdder) this.props.threadAdder(this)
    //console.log("SingleStoryThread", this.props.match.params.title, this.props)
    this.load()
  }

  load = page => {
    console.log("PPP", "W", 1)
    if(!page) {
      console.log("PPP", "W", 2)
      this.loadPage(["site_content_wedding_stories", "site_content_blog_posts"], {
        slug: this.props.match.params.title,
        nav_key: "site_content_wedding_stories"
      }, loaded => {
        console.log("PPP", 3, loaded)
        if(loaded.cursor == "prev") {
          console.log("PPP", 4)
          this.setState({prevLoaded: true, prev: loaded.page})
  
        } else if(loaded.cursor == "next") {console.log("PPP", 5)
          this.setState({nextLoaded: true, next: loaded.page})
        }
        
      })

    } else {
      console.log("PPP", "W", 3)
      this.setState({
        prev: null,
        prevLoaded: false,
        next: null, 
        nextLoaded: false
      })
      this.loadPage(page, {
        slug: this.props.match.params.title,
        nav_key: "site_content_wedding_stories"
      }, loaded => {
        if(loaded.cursor == "prev") {
          console.log("PPP", 4)
          this.setState({prevLoaded: true, prev: loaded.page})
  
        } else if(loaded.cursor == "next") {console.log("PPP", 5)
          this.setState({nextLoaded: true, next: loaded.page})
        }
        
      }, () => {
        window.history.replaceState("ThisPage", this.state.page.get("title"), `/${this.state.page.get("slug")}`)
      })
    }
  }
  
  getDate = () => {
    //"dddd, mmmm dS, yyyy, h:MM:ss TT" => Saturday, June 9th, 2007, 5:46:21 PM
    //September 1, 2019 22:00
    return this.state.page && this.state.page.get? dateFormat(this.state.page.get("createdAt"), "mmmm d, yyyy HH:MM") : ""
  }

  loadPrev = (e) => {
    e.preventDefault()
    var textElementsProps = this.state.textElementsProps
    textElementsProps.elements = []
    textElementsProps.elements_backup = []

    var imageElementsProps = this.state.imageElementsProps
    imageElementsProps.elements = []
    imageElementsProps.elements_backup = []

    this.setState({
      textElementsProps: textElementsProps,
      imageElementsProps: imageElementsProps
    })
    this.load(this.state.prev)
  }

  loadNext = (e) => {
    e.preventDefault()
    var textElementsProps = this.state.textElementsProps
    textElementsProps.elements = []
    textElementsProps.elements_backup = []

    var imageElementsProps = this.state.imageElementsProps
    imageElementsProps.elements = []
    imageElementsProps.elements_backup = []

    this.setState({
      textElementsProps: textElementsProps,
      imageElementsProps: imageElementsProps
    })
    this.load(this.state.next)
  }

  increaseLikes = () => {
    var page = this.state.page
    page.get("likes")? page.set("likes", page.get("likes") + 1):  page.set("likes", 1)
    this.setState({page: page})
  }

  render() {
    return super.render(
      <>
        <Helmet>
          <title>{this.state.page? this.state.page.get("title") : ""}</title>
          <meta name="description" content={this.state.page? truncText(this.state.page.get("description"), HTML_DESCRIPTION_LENGTH) : ""} />
          <meta name="robots" content="index, follow" />
          <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
          <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
          
          <link rel="canonical" href={this.state.page? `${SEO_BASE_URL + this.state.page.get("slug")}` : ""} />
          
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={this.state.page? this.state.page.get("title") : ""} />
          <meta property="og:description" content={this.state.page? this.state.page.get("description") : ""} />

          <meta property="og:url" content={this.state.page? `${SEO_BASE_URL + this.state.page.get("slug")}` : ""} />
          <meta property="og:site_name" content={this.props.spoolAttributes? this.props.spoolAttributes.site_info_site_name_spaced : ""} />
          <meta property="article:modified_time" content={this.state.page? this.state.page.get("updatedAt") : ""} />
          
           {/*
          <meta property="article:section" content="Photography" />
          <meta property="article:tag" content="sharp" />
          <meta property="article:tag" content="nice" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:image" content="https://i1.wp.com/css-tricks.com/wp-content/uploads/2019/10/react-helmet.png?ssl=1" />
          <meta name="twitter:creator" content="@CSS" />
          <meta name="twitter:site" content="@CSS" />*/}
        </Helmet>
        {/*
          <HeaderImageBanner 
          imageEditableProps={{...this.state.imageElementsProps, edit: this.props.edit}} />*/
        }
        <section className="story-title">
          <a href="/blog/this-story-title">{this.state.page? this.state.page.get("title") : ""}</a>
          <div>{this.getDate()}</div>
        </section>
        <section className="blog-content">
          {
            this.state.refresh?
            <></>
            :
            <TextEditable 
            key={this.state.page? this.state.page.get("slug") : ""}
            isHtml 
            editorImageAlt={this.state.page? slugify(this.state.page.get("title")).replace(/-/g, " ") : ""}
            role={ROLES.mod}
            name="content"
            {...this.state.textElementsProps}
            edit={this.props.edit}
            style={{
              width: "100%",
              height: "500px"
            }} />
          }
        </section>
        <section className="row navigators-and-likes">
          <div className="col-12 col-md-6">
            <ul className="breadcrumb">
              <li>
                <Link to="/">ImageStudio</Link>
              </li>
              <li className="exception">
                <Link to="/photo/">Stories</Link>
              </li>
              {/*
                <li className="exception">
                <a href="https://domain.tld/wedding/type/">
                  Wedding Type
                </a>
              </li>*/
              }
              <li className="exception">
                {
                  this.state.page?
                  <Link to={`/${this.state.page.get("title")}`} style={{textTransform: "capitalize"}}>
                    {
                      this.state.page.get("title").replace(/-/g, " ")
                    }
                  </Link>
                  :
                  <i>...</i>
                }
              </li>
            </ul>
          </div>
          <div className="col-8 col-md-4">
            {
              this.state.prevLoaded?
              <a href={`/${this.state.prev.get("slug")}`} onClick={this.loadPrev}>
                <span>〈</span>
                <span>Previous</span>
              </a>
              :<></>
            }
            
            <span>|</span>

            {
              this.state.nextLoaded?
              <a href={`/${this.state.next.get("slug")}`} onClick={this.loadNext}>
                <span>Next</span>
                <span>〉</span>
              </a>
              :<></>
            }
          </div>
          <div className="col-4 col-md-2">
            <PageReaction info={{type: "like", pageId: this.state.page? this.state.page.id : null}} 
            widget_loading_text="Like button loading..." onValid={this.increaseLikes}>
              <a id="likeButton" href="javascript:void(0);">
                <i className="fa fa-heart" />
              </a>
            </PageReaction>
            <span>{this.state.page && this.state.page.get("likes")? this.state.page.get("likes") : 0}</span>
            <span>likes</span>
          </div>
        </section>
      </>
    );
  }
}

export default SingleStoryThread;