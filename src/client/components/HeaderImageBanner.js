import React from "react";
import ImageEditable from "./editables/ImageEditable";
import { IMAGE_PICTURE_SOURCE_EXTENSIONS, IMAGE_PROCCESSORS } from "../../both/Constants";

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
          className="header-banner-image"
          style={{
            display: "block",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            height: "70vh",
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
          {...this.props}
          display={{
            image_exts: IMAGE_PICTURE_SOURCE_EXTENSIONS,
            default: {queries: `w=300`, proccessors: IMAGE_PROCCESSORS},
            manifests: [
              {at: 300, queries: `w=300`, proccessors: IMAGE_PROCCESSORS},
              {at: 576, queries: `w=576`, proccessors: IMAGE_PROCCESSORS},
              {at: 768, queries: `w=768`, proccessors: IMAGE_PROCCESSORS},
              {at: 1200, queries: `w=1200`, proccessors: IMAGE_PROCCESSORS}
            ]
          }} />
      </section>
    );
  }
}

export default HeaderImageBanner;
