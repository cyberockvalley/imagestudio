import React from "react";
import Header from "./Header";
import HeaderImageBanner from "./HeaderImageBanner";
import NavBar from "./NavBar";
import FooterContactUs from "./FooterContactUs";
import Footer from "./Footer";
import { Helmet } from 'react-helmet'
import Page from "./Page";
import EditableStateContext from "./editables/EditableStateContext";
import { lastValueOrThis, truncText } from "../../both/Functions";
import { EMPTY_TEXT_ELEMENT_DATA } from "./editables/Editable";
import { HTML_DESCRIPTION_LENGTH, SEO_BASE_URL } from "../../both/Constants";


class SingleWeddingStory extends Page {
  static contextType = EditableStateContext
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.loadPage("single-blog")

    
  }
  render() {
    return (
      <>
        <Helmet>
          <title>{lastValueOrThis(this.state.page, {get: () => {return ""}}).get("title")}</title>
          <meta name="description" content={truncText(lastValueOrThis(this.state.page, {get: () => {return ""}}).get("description"), HTML_DESCRIPTION_LENGTH)} />
        
          <meta name="robots" content="index, follow" />
          <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
          <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
          
          <link rel="canonical" href={SEO_BASE_URL} />
          
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={lastValueOrThis(this.state.page, {get: () => {return ""}}).get("title")} />
          <meta property="og:description" content={truncText(lastValueOrThis(this.state.page, {get: () => {return ""}}).get("description"), HTML_DESCRIPTION_LENGTH)} />
          <meta property="og:url" content="https://css-tricks.com/its-all-in-the-head-managing-the-document-head-of-a-react-powered-site-with-react-helmet/" />
          <meta property="og:site_name" content="CSS-Tricks" />
          <meta property="article:publisher" content="https://www.facebook.com/CSSTricks" />
          <meta property="article:published_time" content="2019-10-30T15:10:50+00:00" />
          <meta property="article:modified_time" content="2019-12-23T17:11:19+00:00" />
          <meta property="article:author" content="Image Studio" />
          <meta property="article:section" content="Photography" />
          <meta property="article:tag" content="sharp" />
          <meta property="article:tag" content="nice" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:image" content="https://i1.wp.com/css-tricks.com/wp-content/uploads/2019/10/react-helmet.png?ssl=1" />
          <meta name="twitter:creator" content="@CSS" />
          <meta name="twitter:site" content="@CSS" />
        </Helmet>
        <Header />
        <HeaderImageBanner />
        <NavBar />
        <section className="story-title">
          <a href="/blog/this-story-title">Wedding in Rome – Irina & Sam</a>
          <div>September 1, 2019 22:00</div>
        </section>
        <section className="stories"></section>
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
        <FooterContactUs />
        <Footer />
      </>
    );
  }
}

export default SingleWeddingStory;
