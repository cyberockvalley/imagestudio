import React, { useContext } from "react";
import EditableStateContext from "./editables/EditableStateContext";
import TextEditable from "./editables/TextEditable";
import { IFRAME_STYLES } from "./widgets/IframeView";

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
          position: "relative",
          overflow: "hidden",
          marginTop: this.context.edit? "80px" : "0px"
        }}
      >
        <TextEditable 
          isYoutube
          iframeOptions={{
            showIframe: !this.context.edit,
            iframeStyle: IFRAME_STYLES.inline,
            autoPlay: true,
            disableRel: true,
            disableControls: true,
            disableKb: true,
            disableLogo: true,
            disableFullscreen: true,
            hideInfo: true,
            loop: true,
            mute: true,
            containerStyle: styles.inlineContainer,
            containerClass: "yt-hide-widgets",
            style: styles.iframe
          }}
          id="introIframeMobile"
          name="site_info_header_iframe"
          placeholder="Enter youtube video id..."
          {...this.props.textEditableProps}
          is_input_text />
          <div style={this.context.edit? {display: "none"} : styles.overlay}></div>
          {/*
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
          spinnerWidth={100}
          spinnerHeight={100}
          spinnerThickness={7}
          spinnerRunnerColor="#f33"
          centerElement={
            <FilmRollerAnimation 
              top_text="Image"
              bottom_text="Studio" />
          } 
          showInfo
        add_overlay/>*/}
      </section>
    );
  }
}

const styles = {
  inlineContainer: {
    position: "relative",
    width: "100%",
    height: 0,
    paddingBottom: "56.25%"
  },
  iframe: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%"
  },
  overlay: {
    position: "absolute",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
    backgroundColor: "#000",
    overflow: "hidden",
    opacity: 0.5,
    top: 0
  }
}

export default HeaderVideoBanner;
