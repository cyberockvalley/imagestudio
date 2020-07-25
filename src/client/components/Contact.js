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
import { EMPTY_TEXT_ELEMENT_DATA } from "./editables/Editable";
import ImageEditable from "./editables/ImageEditable";

class Contact extends Page {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.loadPage("contact_us", {
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
          
          <link rel="canonical" href={SEO_BASE_URL + "contact"} />
          
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
        <section
          className="row"
          style={{
            marginTop: "50px"
          }}
        >
          <div className="col-11 col-md-10 w-margin-auto">
            <div className="row">
              <div className="col-sm-7">
                <div className="row">
                  <div className="col-md-6 text-miracle">
                    <h2 className="miracle-title">
                      <TextEditable 
                        name={"site_info_contact_page_header_1"}
                        {...this.state.textElementsProps} is_input_text />
                    </h2>
                    <h3 className="miracle-body">
                      <TextEditable 
                        name={"site_info_contact_page_body_1"}
                        {...this.state.textElementsProps}
                        enable_line_break />
                    </h3>
                  </div>
                  <div className="col-md-6 d-none d-md-block">
                    <div className="contact-info align-items-start">
                      <a href="mailto:info@imagestudio.com">
                        <i className="fa fa-2x fa-at" />
                        <span>
                          <TextEditable 
                              name={"site_info_email"}
                              {...this.state.textElementsProps} is_input_text/>
                        </span>
                      </a>
                      <a target="_blank" href={"https://instagram.com/" + (lastValueOrThis(this.context, "site_info_instagram_username", EMPTY_TEXT_ELEMENT_DATA).data)}>
                        <i className="fa fa-2x fa-instagram" />@
                        <span>
                          <TextEditable 
                              name={"site_info_instagram_username"}
                              {...this.state.textElementsProps} is_input_text/>
                        </span>
                      </a>
                      <a href={"tel:" + (lastValueOrThis(this.context, "site_info_phone_number", EMPTY_TEXT_ELEMENT_DATA).data)}>
                        <i className="fa fa-2x fa-phone" />
                        <span>
                          <TextEditable 
                              name={"site_info_phone_number"}
                              {...this.state.textElementsProps} is_input_text/>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <form className="contact-form all col-12 w-margin-auto">
                    <input
                      type="text"
                      onchange="this.handleChange"
                      name="name"
                      placeholder="NAME"
                    />
                    <input
                      type="text"
                      onchange="this.handleChange"
                      name="email"
                      placeholder="YOUR EMAIL"
                    />
                    <textarea
                      name="message"
                      placeholder="DAY / EVENT / IDEAS..."
                      defaultValue={""}
                    />
                    <button
                      type="submit"
                      style={{
                        marginTop: "25px",
                        alignSelf: "center"
                      }}
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-sm-5">
                <ImageEditable
                  className="contact-photo"
                  name="site_info_contact_page_main_photo"
                  {...this.state.imageElementsProps}
                  spinnerWidth={100}
                  spinnerHeight={100}
                  spinnerThickness={7}
                  spinnerRunnerColor="#f33" />
                <div
                  className="angle-line angle-135"
                  style={{
                    position: "absolute"
                  }}
                />
              </div>
            </div>
            <div
              className="row"
              style={{
                margin: "50px 0px !important",
                padding: "0px !important"
              }}
            >
              <div
                className="col-sm-8"
                style={{
                  height: "247px",
                  padding: "10px"
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5938.98072352206!2d12.447683825393748!3d41.903816266880455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f60660c3e3925%3A0x498c3835506c3c!2s00120%20Vatican%20City!5e0!3m2!1sen!2sng!4v1592743883321!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  frameBorder={0}
                  style={{
                    border: 0
                  }}
                  allowFullScreen
                />
              </div>
              <div
                className="col-sm-4 "
                style={{
                  height: "247px",
                  padding: "10px"
                }}
              >
                <ImageEditable
                  className="h-margin-auto"
                  name="site_info_contact_page_image_beside_map"
                  {...this.state.imageElementsProps}
                  spinnerWidth={100}
                  spinnerHeight={100}
                  spinnerThickness={7}
                  spinnerRunnerColor="#f33" />
              </div>
            </div>
            <div
              className="row d-md-none"
              style={{
                padding: "0px !important",
                margin: "0px !important"
              }}
            >
              <div
                className="col-12"
                style={{
                  padding: "0px !important",
                  margin: "0px !important"
                }}
              >
                <div className="contact-info align-items-start d-md-nones">
                  <a href={"mailto:" + (lastValueOrThis(this.context, "site_info_email", EMPTY_TEXT_ELEMENT_DATA).data)}>
                    <i className="fa fa-2x fa-at" />
                    <span>
                      <TextEditable 
                          name={"site_info_email"}
                          {...this.state.textElementsProps} is_input_text/>
                    </span>
                  </a>
                  <a target="_blank" href={"https://instagram.com/" + (lastValueOrThis(this.context, "site_info_instagram_username", EMPTY_TEXT_ELEMENT_DATA).data)}>
                    <i className="fa fa-2x fa-instagram" />@
                    <span>
                      <TextEditable 
                          name={"site_info_instagram_username"}
                          {...this.state.textElementsProps} is_input_text/>
                    </span>
                  </a>
                  <a href={"tel:" + (lastValueOrThis(this.context, "site_info_phone_number", EMPTY_TEXT_ELEMENT_DATA).data)}>
                    <i className="fa fa-2x fa-phone" />
                    <span>
                      <TextEditable 
                          name={"site_info_phone_number"}
                          {...this.state.textElementsProps} is_input_text/>
                    </span>
                  </a>
                </div>
              </div>
            </div>
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

export default Contact;
