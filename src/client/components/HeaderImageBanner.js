import React from "react";
import ImageEditable from "./editables/ImageEditable";
import { useLocation, useRouteMatch } from "react-router-dom";

class HeaderImageBanner extends React.Component {
  constructor(props) {
    super(props)

  }
  

  render() {
    return (
      <section
        id="intro"
        style={{
          overflow: "hidden"
        }}
      >
        <ImageEditable
          style={{
            position: "relative",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            width: "100%",
            backgroundColor: "#000",
            overflow: "hidden"
          }}
          name={this.props.name}
          link={this.props.name}
          {...this.props.imageEditableProps}
          spinnerWidth={100}
          spinnerHeight={100}
          spinnerThickness={7}
          spinnerRunnerColor="#f33"
          {...this.props} />
      </section>
    );
  }
}

export default HeaderImageBanner;
