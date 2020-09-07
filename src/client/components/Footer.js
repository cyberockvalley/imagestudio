import React from "react";
import { Link } from "react-router-dom";
import TextEditable from "./editables/TextEditable";

class Footer extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="footer" style={{height: "120px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
        <div>
          <div>
            <TextEditable 
                name={"site_info_first_footer_text"}
                {...this.props.textEditableProps} is_input_text/>
          </div>
          <Link to="/">
            <TextEditable 
              name={"site_info_second_footer_text"}
              {...this.props.textEditableProps} is_input_text/>
          </Link>
        </div>
        <div style={{fontSize: "11px", textAlign: "center"}}>
          <div>Site protected by reCAPTCHA</div> 
          <div class="rc-anchor-pt">
            <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank">reCAPTCHA Privacy</a>
            <span aria-hidden="true" role="presentation"> - </span>
            <a href="https://www.google.com/intl/en/policies/terms/" target="_blank">reCAPTCHA Terms</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
