import React from "react";
import { Link } from "react-router-dom";
import { EMPTY_TEXT_ELEMENT_DATA } from "./editables/Editable";
import { lastValueOrThis } from "../../both/Functions";
import TextEditable from "./editables/TextEditable";
import EditableStateContext from "./editables/EditableStateContext";

class FooterContactUs extends React.Component {
  static contextType = EditableStateContext
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="contact-us" style={{marginTop: 150}}>
        <div className="col-md-6">
          <div
            style={{
              margin: "0px"
            }}
          />
          <div className="contact-info">
            <a href={"mailto:" + (lastValueOrThis(this.context, "site_info_email", EMPTY_TEXT_ELEMENT_DATA).data)}>
              <span>
                <TextEditable 
                      name={"site_info_email"}
                      {...this.props.textEditableProps} is_input_text /> 
              </span>
              <i className="fa fa-2x fa-at" />
            </a>
            <a target="_blank" href={"https://instagram.com/" + (lastValueOrThis(this.context, "site_info_instagram_username", EMPTY_TEXT_ELEMENT_DATA).data)}>@
              <span>
                <TextEditable 
                      name={"site_info_instagram_username"}
                      {...this.props.textEditableProps} is_input_text /> 
              </span>
              <i className="fa fa-2x fa-instagram" />
            </a>
            <a href={"tel:" + (lastValueOrThis(this.context, "site_info_phone_number", EMPTY_TEXT_ELEMENT_DATA).data)}>
              <span>
                <TextEditable 
                      name={"site_info_phone_number"}
                      {...this.props.textEditableProps} is_input_text /> 
              </span>
              <i className="fa fa-2x fa-phone" />
            </a>
          </div>
        </div>
        <div
          className="col-md-6"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "end"
          }}
        >
          <div
            style={{
              margin: "15px 0px"
            }}
          >
            <div
              style={{
                margin: "auto 0px"
              }}
            >
            <TextEditable 
                  name={"site_info_text_above_footer_contact_button"}
                  {...this.props.textEditableProps} />
            </div>
            <Link 
              to="/contact"
              className="call-to-action"
              style={{
                display: "inline-block",
                height: "auto",
                marginTop: "70px"
              }}
            >
              <TextEditable 
                  name={"site_info_footer_contact_button_text"}
                  {...this.props.textEditableProps} is_input_text />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default FooterContactUs;
