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

class SingleBlogThread extends Page {
  static contextType = EditableStateContext
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.setState({likes: 0})
    if(this.props.threadAdder) this.props.threadAdder(this)
    //console.log("SingleBlogThread", this.props.match.params.title, this.props)
    this.loadPage(["site_content_blog_posts"], {
      slug: this.props.match.params.title
    })

    
  }

  getDate = () => {
    //"dddd, mmmm dS, yyyy, h:MM:ss TT" => Saturday, June 9th, 2007, 5:46:21 PM
    return this.state.page && this.state.page.get? dateFormat(this.state.page.get("createdAt"), "mmmm d, yyyy") : ""
  }

  increaseLikes = () => {
    this.setState({likes: this.state.likes + 1})
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
          <meta property="article:section" content="Photography" />
          <meta property="article:tag" content="sharp" />
          <meta property="article:tag" content="nice" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:image" content="https://i1.wp.com/css-tricks.com/wp-content/uploads/2019/10/react-helmet.png?ssl=1" />
          <meta name="twitter:creator" content="@CSS" />
          <meta name="twitter:site" content="@CSS" />
        </Helmet>
        <HeaderImageBanner 
          imageEditableProps={{...this.state.imageElementsProps, edit: this.props.edit}}
          isPointer
          role={ROLES.mod}
          name="featured_image" />
        <section className="blog-header">
          <h1>{this.state.page? this.state.page.get("title") : ""}</h1>
          <hr className="title_break" />
          <div className="post_detail">
            <span className="post_info_date">{this.getDate()}</span>
          </div>
          <div className="col-12 blog-body">
            <TextEditable isHtml 
              editorImageAlt={this.state.page? slugify(this.state.page.get("title")).replace(/-/g, " ") : ""}
              role={ROLES.mod}
              name="content"
              {...this.state.textElementsProps}
              edit={this.props.edit} />
          </div>
        </section>
      </>
    );
  }
}

export default SingleBlogThread;