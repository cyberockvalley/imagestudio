import React from "react";
import { Link } from "react-router-dom";
import TextEditable from "./editables/TextEditable";

class Footer extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="footer">
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
    );
  }
}

export default Footer;
