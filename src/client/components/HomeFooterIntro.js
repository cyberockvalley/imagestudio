import React, { useContext } from "react";
import TextEditable from "./editables/TextEditable";
import { lastValueOrThis } from "../../both/Functions";
import EditableStateContext from "./editables/EditableStateContext";
import { EMPTY_TEXT_ELEMENT_DATA } from "./editables/Editable";

class HomeFooterIntro extends React.Component {
  static contextType = EditableStateContext
  constructor(props) {
    super(props)
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
            <form className="contact-form d-none d-sm-block">
              <input
                type="text"
                onchange="this.handleChange"
                name="name"
                placeholder="Name"
              />
              <input
                type="text"
                onchange="this.handleChange"
                name="email"
                placeholder="Email"
              />
              <input
                type="text"
                onchange="this.handleChange"
                name="telephone"
                placeholder="Telephone"
              />
              <textarea
                name="message"
                placeholder="Message..."
                defaultValue={""}
              />
              <button type="submit">Send</button>
            </form>
            <div
              className="d-block d-sm-none"
              style={{
                background: "#d6a047",
                padding: "25px",
                height: "auto"
              }}
            >
              <form className="contact-form">
                <div>
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
                  onchange="this.handleChange"
                  name="name"
                  placeholder="Name"
                />
                <input
                  type="text"
                  onchange="this.handleChange"
                  name="email"
                  placeholder="Email"
                />
                <input
                  type="text"
                  onchange="this.handleChange"
                  name="telephone"
                  placeholder="Telephone"
                />
                <textarea
                  name="message"
                  placeholder="Message..."
                  defaultValue={""}
                />
                <button type="submit">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeFooterIntro;
