import React from "react";
import ImageEditable from "./editables/ImageEditable";
import { useLocation, useRouteMatch } from "react-router-dom";

class HeaderImageBanner extends React.Component {
  constructor(props) {
    super(props)

  }
  

  getBannerName() {
    var name = ""
    if(this.props.path) {
      if(this.props.path.startsWith("/photo")) {
        name = "site_info_wedding_stories_header_image"
  
      } else if(this.props.path.startsWith("/portfolio")) {
        name = "site_info_wedding_photos_header_image"
  
      } else if(this.props.path.startsWith("/videos/music")) {
        name = "site_info_music_video_header_image"
        
      } else if(this.props.path.startsWith("/videos/commercial")) {
        name = "site_info_commercial_video_header_image"
        
      } else if(this.props.path.startsWith("/videos")) {
        name = "site_info_wedding_video_header_image"
        
      }
    }
    return name
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
          id={this.getBannerName()}
          style={{
            position: "relative",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            width: "100%",
            backgroundColor: "#000",
            overflow: "hidden"
          }}
          name={this.getBannerName()}
          link={this.getBannerName()}
          {...this.props.imageEditableProps}
          spinnerWidth={100}
          spinnerHeight={100}
          spinnerThickness={7}
          spinnerRunnerColor="#f33" />
      </section>
    );
  }
}

export default HeaderImageBanner;
