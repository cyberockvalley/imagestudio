import React, { useContext } from "react";
import VideoEditable from "./editables/VideoEditable";
import EditableStateContext from "./editables/EditableStateContext";
import { lastValueOrThis } from "../../both/Functions";
import FilmRollerAnimation from "./animations/FilmRollerAnimation";

class HeaderVideoBanner extends React.Component {
  static contextType = EditableStateContext
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
        <VideoEditable
          id="introVideoMobile"
          style={{
            position: "relative",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            width: "100%",
            backgroundColor: "#000",
            overflow: "hidden"
          }}
          
          name="site_info_header_video"
          {...this.props.videoEditableProps}
          textEditableProps={this.props.textEditableProps}
          title="site_info_header_video_title"
          title_height={100}
          description="site_info_header_video_description" 
          description_height={56}
          showInfo={true}
          spinnerWidth={100}
          spinnerHeight={100}
          spinnerThickness={7}
          spinnerRunnerColor="#f33"
          centerElement={
            <FilmRollerAnimation 
              top_text="Image"
              bottom_text="Studio" />
          }/>
      </section>
    );
  }
}

export default HeaderVideoBanner;
