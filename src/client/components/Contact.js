import React from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { lastValueOrThis, truncText, isValidPhone, isValidEmail } from "../../both/Functions";
import Page from "./Page";
import { HTML_DESCRIPTION_LENGTH, SEO_BASE_URL, GOOGLE_CAPTCHA_SITE_KEY } from "../../both/Constants";
import TextEditable from "./editables/TextEditable";
import { EMPTY_TEXT_ELEMENT_DATA } from "./editables/Editable";
import ImageEditable from "./editables/ImageEditable";
import Recaptcha from 'react-google-invisible-recaptcha'
import ParseClient, { handleParseError } from "../../both/Parse";
import EditableStateContext from "./editables/EditableStateContext";

class Contact extends Page {
  static contextType = EditableStateContext
  constructor(props){
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.loadPage("contact_us", {
      no_video: true
    })

    
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({sendingMail: true, errors: {}})
    var name = this.state.name
    var email = this.state.email
    var phone = this.state.phone
    var message = this.state.message
    var hasError = false
    var errorMessage = {}

    if(!name || name.length == 0) {
      errorMessage.name = "Please enter your name"; hasError = true
    }

    if(!email || email.length == 0) {
        errorMessage.email = "Please enter your email address"; hasError = true

    } else if(!isValidEmail(email)) {
        errorMessage.email = "Please enter a valid email address"; hasError = true
    }

    if(phone && phone.length > 0 && !isValidPhone(phone)) {
      errorMessage.phone = "Please enter a valid phone number"; hasError = true
    }

    if(!message || message.length == 0) {
      errorMessage.message = "Please enter your message"; hasError = true
    }

    if(hasError) {
        this.setState({errors: errorMessage, sendingMail: false})

    } else {
      this.recaptcha.execute()
    }
    //console.log("contactMail", "handleSubmit", this.state)
  }

  captchaResolveHandler = () => {
    //console.log("contactMail", "captchaResolveHandler", this.recaptcha.getResponse())
    ParseClient.Cloud.run('contactMail', {
      botToken: this.recaptcha.getResponse(),
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      message: this.state.message
    })
    .then(response => {
        //console.log("contactMail", response)
        if(response.success) {
          alert("Message sent! We will get back to you through the provided email address.")

        } else {
          if(response.error) {
            alert(response.error)
          }
        }
        this.setState({sendingMail: false, errors: response.errors? response.errors : {}})
    })
    .catch(e => {
        //console.log("contactMail", "Error", e)
        this.setState({sendingMail: false})
        handleParseError(e)
    })
  }

  render() {
    return super.render(
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
        <Header history={this.props.history} 
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
                      <a href={`mailto:${lastValueOrThis(this.state.elementsAttributes.site_info_email, EMPTY_TEXT_ELEMENT_DATA).data}`}>
                        <i className="fa fa-2x fa-at" />
                        <span>
                          <TextEditable 
                              name={"site_info_email"}
                              {...this.state.textElementsProps} is_input_text/>
                        </span>
                      </a>
                      <a target="_blank" href={`https://instagram.com/${lastValueOrThis(this.state.elementsAttributes.site_info_instagram_username, EMPTY_TEXT_ELEMENT_DATA).data}`}>
                        <i className="fa fa-2x fa-instagram" />@
                        <span>
                          <TextEditable 
                              name={"site_info_instagram_username"}
                              {...this.state.textElementsProps} is_input_text/>
                        </span>
                      </a>
                      <a href={`tel:${lastValueOrThis(this.state.elementsAttributes.site_info_phone_number, EMPTY_TEXT_ELEMENT_DATA).data}`}>
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
                  <form className="contact-form all col-12 w-margin-auto" onSubmit={this.handleSubmit}>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      name="name"
                      placeholder="NAME"
                    />
                    {
                    this.state.errors && this.state.errors.name? 
                      <div className="invalid-feedback d-block">{this.state.errors.name}</div> : null
                    }
                    <input
                      type="text"
                      onChange={this.handleChange}
                      name="email"
                      placeholder="YOUR EMAIL"
                    />
                    {
                    this.state.errors && this.state.errors.email? 
                      <div className="invalid-feedback d-block">{this.state.errors.email}</div> : null
                    }
                    <textarea
                      name="message"
                      onChange={this.handleChange}
                      placeholder="DAY / EVENT / IDEAS..."
                      ></textarea>
                    {
                    this.state.errors && this.state.errors.message? 
                      <div className="invalid-feedback d-block">{this.state.errors.message}</div> : null
                    }
                    <button
                      type="submit"
                      style={{
                        marginTop: "25px",
                        alignSelf: "center"
                      }}
                      disabled={this.state.sendingMail}>
                        {this.state.sendingMail? <i>Please wait...</i> : "Send Message"}
                    </button>
                  </form>
                  <Recaptcha
                    ref={ ref => this.recaptcha = ref }
                    sitekey={GOOGLE_CAPTCHA_SITE_KEY}
                    onResolved={ this.captchaResolveHandler } />
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
                  className="lazyload"
                  data-src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5938.98072352206!2d12.447683825393748!3d41.903816266880455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f60660c3e3925%3A0x498c3835506c3c!2s00120%20Vatican%20City!5e0!3m2!1sen!2sng!4v1592743883321!5m2!1sen!2sng"
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
