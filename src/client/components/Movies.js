import React from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import FooterContactUs from "./FooterContactUs";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { lastValueOrThis, truncText } from "../../both/Functions";
import Page from "./Page";
import { HTML_DESCRIPTION_LENGTH, SEO_BASE_URL } from "../../both/Constants";
import TextEditable from "./editables/TextEditable";
import ImageEditable from "./editables/ImageEditable";

class Movies extends Page {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.loadPage("movies", {
      no_video: true
    })

    
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
          
          <link rel="canonical" href={SEO_BASE_URL + "/portfolio"} />
          
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
        <>
          <Header  
            edit={this.state.edit}
            user={this.state.user}
            userRole={this.state.userRole}
            onEditOrSaveButtonClicked={this.handleEditOrSaveButtonClick}
            onCancelEdit={this.handleCancelEdit}
            textEditableProps={this.state.textElementsProps} />
          <NavBar />
          <div
            className="row"
            style={{
              background: "#efefef"
            }}
          >
            <section className="row col-11 movie-view">
              <div className="col-md-3 flex-column flex-justify-between d-none d-md-flex">
                <div />
                <div className="movie-more-about-us">
                  <a href>More about our work</a>
                </div>
              </div>
              <div className="col-12 col-md-9 movie-big-picture-box">
                <ImageEditable
                  className="movie-big-picture"
                  name="site_info_movies_top_left_background_image"
                  {...this.state.imageElementsProps}
                  spinnerWidth={100}
                  spinnerHeight={100}
                  spinnerThickness={7}
                  spinnerRunnerColor="#f33" />{/*
                <div
                  className="movie-big-picture"
                  style={{
                    backgroundImage: "url(images/768x432.png)"
                  }}
                />*/}
              </div>
              <div className="d-md-none col-12 col-md-3 flex-column">
                <div />
                <div className="movie-more-about-us">
                  <a href>More about our work</a>
                </div>
              </div>
              <ImageEditable
                className="d-none d-md-block"
                id="introVideoMobile"
                style={{
                  position: "absolute",
                  top: 50,
                  left: "50px",
                  width: "35%",
                  height: "80%"
                }}
                name="site_info_movies_top_left_image"
                {...this.state.imageElementsProps}
                spinnerWidth={100}
                spinnerHeight={100}
                spinnerThickness={7}
                spinnerRunnerColor="#f33" />{/*
              <img
                className="d-none d-md-block"
                style={{
                  position: "absolute",
                  left: "50px",
                  width: "35%",
                  height: "80%"
                }}
                src="images/4-Mark-and-Sarah-Wedding-in-Umbria-Paola-Simonelli-italian-wedding-photographer-wedding-in-Italy-4333-760x510.jpg"
              />*/}
            </section>
          </div>
          <div
            className="row"
            style={{
              background: "#222",
              padding: "15px"
            }}
          >
            <section className="row col-12 movies w-margin-auto"></section>
          </div>
          <section className="about-us movie-about-us">
            <h2>
                <TextEditable 
                  name={"site_info_about_us_header_text"}
                  {...this.state.textElementsProps} />
            </h2>
            <p>
                <TextEditable 
                  name={"site_info_about_us_body_text"}
                  {...this.state.textElementsProps} />
            </p>
          </section>
          <FooterContactUs
            edit={this.state.edit}
            user={this.state.user}
            userRole={this.state.userRole}
            textEditableProps={this.state.textElementsProps} />
          <Footer
            edit={this.state.edit}
            user={this.state.user}
            userRole={this.state.userRole}
            textEditableProps={this.state.textElementsProps} />
        </>
      </>
    );
  }
}

export default Movies;
