const dateFormat = require('dateformat')
import React from "react";
import HeaderImageBanner from "./HeaderImageBanner";
import { Helmet } from 'react-helmet'
import Page from "./Page";
import EditableStateContext from "./editables/EditableStateContext";
import { lastValueOrThis, truncText, isClient, slugify } from "../../both/Functions";
import { EMPTY_TEXT_ELEMENT_DATA } from "./editables/Editable";
import { HTML_DESCRIPTION_LENGTH, SEO_BASE_URL, ROLES } from "../../both/Constants";
import TextEditable from "./editables/TextEditable";

import WordProcessor from "./widgets/word/WordProcessor";
import ParseClient from "../../both/Parse";

class SingleBlogThread extends Page {
  static contextType = EditableStateContext
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log("SingleBlogThread", this.props.match.params.title, this.props)
    this.loadPage(["site_content_wedding_stories", "site_content_blog_posts"], {
      slug: this.props.match.params.title
    })

    
  }

  formatDate = date => {
    //"dddd, mmmm dS, yyyy, h:MM:ss TT" => Saturday, June 9th, 2007, 5:46:21 PM
    //September 1, 2019 22:00
    return dateFormat(date, "mmmm d, yyyy HH:MM")

  }

  onEditorStateChange = editorState => {
      this.setState({
        editorState,
      });
  }

  wordProcessorUploadHandler = (files) => {
		return new Promise(
		  (resolve, reject) => {
			
			var promises = []
			for(var i = 0; i < files.length; i++) {
				var parseFile = new ParseClient.File("file", files[i])
				promises.push(parseFile.save())
			}
			Promise.all(promises)
			.then(uploads => {
        var urls = []
        uploads.forEach(upload => {
          urls.push(upload.url())
        })
        resolve({data: {list: urls}})
			})
			.catch(e => {
				reject()
			})
    })
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
            imageEditableProps={{...this.state.imageElementsProps, edit: this.props.edit}} />
        <section className="story-title">
          <a href="/blog/this-story-title">{this.state.page? this.state.page.get("title") : ""}</a>
          <div>{this.state.page? this.formatDate(this.state.page.get("createdAt")) : ""}</div>
        </section>
        <section className="stories">
          <WordProcessor 
            uploadHandler={this.wordProcessorUploadHandler}
            imageAlt={this.state.page? slugify(this.state.page.get("title")).replaceAll("-", " ") : ""}
          />
          {/*<TextEditable isHtml 
            role={ROLES.mod}
            name="content"
            textEditableProps={this.state.textElementsProps}
            edit={this.props.edit}
            style={{
              width: "100%",
              height: "500px"
            }} />*/}
        </section>
        <section className="row navigators-and-likes">
          <div className="col-12 col-md-6">
            <ul className="breadcrumb">
              <li>
                <a href="/">ImageStudio</a>
              </li>
              <li className="exception">
                <a href="/portfolio/">Stories</a>
              </li>
              <li className="exception">
                <a href="https://taraweddings.ca/portfolio/priya-sid/">
                  Wedding Type
                </a>
              </li>
              <li className="exception">
                <a href="https://taraweddings.ca/portfolio/priya-sid/#">
                  Priya & Sid
                </a>
              </li>
            </ul>
          </div>
          <div className="col-8 col-md-4">
            <a href="#">
              <span>〈</span>
              <span>Previous</span>
            </a>
            <span>|</span>
            <a href="#">
              <span>Next</span>
              <span>〉</span>
            </a>
          </div>
          <div className="col-4 col-md-2">
            <a id="likeButton" href="javascript:void(0);">
              <i className="fa fa-heart" />
            </a>
            <span>941</span>
            <span>likes</span>
          </div>
        </section>
      </>
    );
  }
}

export default SingleBlogThread;