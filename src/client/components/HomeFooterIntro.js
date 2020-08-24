import React, { useContext } from "react";
import TextEditable from "./editables/TextEditable";
import { lastValueOrThis, isValidPhone, isValidEmail } from "../../both/Functions";
import EditableStateContext from "./editables/EditableStateContext";
import { EMPTY_TEXT_ELEMENT_DATA } from "./editables/Editable";
import ParseClient, { handleParseError } from "../../both/Parse";
import Recaptcha from 'react-google-invisible-recaptcha'
import { GOOGLE_CAPTCHA_SITE_KEY } from "../../both/Constants";

class HomeFooterIntro extends React.Component {
  static contextType = EditableStateContext
  constructor(props) {
    super(props)
    this.state = {}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
          console.log("contactMail", "Error", e)
          this.setState({sendingMail: false})
          handleParseError(e)
      })
  }

  render() {
    return (
      <div>
        <div
          className="d-none d-sm-flex"
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <div className="get-in-touch">
            <h3>
              <TextEditable 
                      name={"site_info_get_in_touch_title"} height="100px"
                      {...this.props.textEditableProps} is_input_text/>
            </h3>
            <div>
              <TextEditable 
                      name={"site_info_get_in_touch_sub_title"}
                      {...this.props.textEditableProps} is_input_text/>
            </div>
          </div>
        </div>
        <div className="contact-us">
          <div className="col-md-6 d-none d-sm-block">
            <div>
              <TextEditable 
                      name={"site_info_text_above_contact_details"}
                      {...this.props.textEditableProps} />
            </div>
            <div className="contact-info">
              <a href={"mailto:" + (lastValueOrThis(this.context, "site_info_email", EMPTY_TEXT_ELEMENT_DATA).data)}>
                <span>
                  <TextEditable 
                      name={"site_info_email"}
                      {...this.props.textEditableProps} is_input_text/>
                </span>
                <i className="fa fa-2x fa-at" />
              </a>
              <a target="_blank" href={"https://instagram.com/" + (lastValueOrThis(this.context, "site_info_instagram_username", EMPTY_TEXT_ELEMENT_DATA).data)}>@
                <span>
                  <TextEditable 
                      name={"site_info_instagram_username"}
                      {...this.props.textEditableProps} is_input_text/>
                </span>
                <i className="fa fa-2x fa-instagram" />
              </a>
              <a href={"tel:" + (lastValueOrThis(this.context, "site_info_phone_number", EMPTY_TEXT_ELEMENT_DATA).data)}>
                <span>
                  <TextEditable 
                      name={"site_info_phone_number"}
                      {...this.props.textEditableProps} is_input_text/>
                </span>
                <i className="fa fa-2x fa-phone" />
              </a>
            </div>
          </div>
          <div className="col-md-6 footer-form">
            <div className="contact-form-container">
              <form className="contact-form home" onSubmit={this.handleSubmit}>
                <div className="d-block d-sm-none">
                  <h2
                    style={{
                      marginTop: "0px"
                    }}
                  >
                    Get in touch
                  </h2>
                  <span>Tell us about your wedding hopes & dreams</span>
                </div>
                <input
                  type="text"
                  onChange={this.handleChange}
                  name="name"
                  placeholder="Name"
                />
                {
                this.state.errors && this.state.errors.name? 
                  <div className="invalid-feedback d-block">{this.state.errors.name}</div> : null
                }
                <input
                  type="text"
                  onChange={this.handleChange}
                  name="email"
                  placeholder="Email"
                />
                {
                this.state.errors && this.state.errors.email? 
                  <div className="invalid-feedback d-block">{this.state.errors.email}</div> : null
                }
                <input
                  type="text"
                  onChange={this.handleChange}
                  name="phone"
                  placeholder="Telephone"
                />
                {
                this.state.errors && this.state.errors.phone? 
                  <div className="invalid-feedback d-block">{this.state.errors.phone}</div> : null
                }
                <textarea
                  name="message"
                  onChange={this.handleChange}
                  placeholder="Message..."
                ></textarea>
                {
                this.state.errors && this.state.errors.message? 
                  <div className="invalid-feedback d-block">{this.state.errors.message}</div> : null
                }
                <button 
                  type="submit"
                  disabled={this.state.sendingMail}>
                  {this.state.sendingMail? <i>Please wait...</i> : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
        <Recaptcha
          ref={ ref => this.recaptcha = ref }
          sitekey={GOOGLE_CAPTCHA_SITE_KEY}
          onResolved={ this.captchaResolveHandler } />
      </div>
    );
  }
}

export default HomeFooterIntro;
