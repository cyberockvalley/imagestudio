import React from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { lastValueOrThis, truncText } from "../../both/Functions";
import Page from "./Page";
import { HTML_DESCRIPTION_LENGTH, SEO_BASE_URL } from "../../both/Constants";
import TextEditable from "./editables/TextEditable";

class About extends Page {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.loadPage("about_us", {
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
          
          <link rel="canonical" href={SEO_BASE_URL + "portfolio"} />
          
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
          <section className="team-page-header" style={{marginTop: 50}}>
            <h3>
              <TextEditable 
                    name={"site_info_site_name_spaced"}
                    {...this.state.textElementsProps} />
            </h3>
            <h3>
              <TextEditable 
                      name={"site_info_about_page_about_us_summary"}
                      {...this.state.textElementsProps} />
            </h3>
          </section>
          <section className="row team-photos"></section>
          <section className="about-us">
            <h2>
              <TextEditable 
                    name={"site_info_about_page_about_us_header_text"}
                    {...this.state.textElementsProps} />
            </h2>
            <p>
              <TextEditable 
                style={{minHeight: 300}}
                name={"site_info_about_us_body_text"}
                {...this.state.textElementsProps}
                is_html
                enable_line_break />
            </p>
            <div
              style={{
                marginTop: "70px"
              }}
            >
              <a className="call-to-action">
                <TextEditable 
                  name={"site_info_about_page_call_to_action"}
                  {...this.state.textElementsProps} is_input_text />
              </a>
            </div>
          </section>
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

export default About;
