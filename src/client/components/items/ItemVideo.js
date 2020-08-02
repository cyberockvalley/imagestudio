import React from "react";
import EditableStateContext from "../editables/EditableStateContext";
import Item from "./Item";
import TextEditable from "../editables/TextEditable";
import ImageEditable from "../editables/ImageEditable";
import { ROLES } from "../../../both/Constants";
import { IFRAME_STYLES } from "../widgets/IframeView";

class ItemVideo extends Item {
  static contextType = EditableStateContext
  constructor(props, context) {
    super(props, context)
    
  }

  componentDidMount() {
    this.setState({pageOptions: this.pageOptions})
    super.componentDidMount()
  }

  pageOptions = {
    no_text: true, 
    no_video: true, 
    no_iframe: true, 
    no_list: true
  }

  toggleIframeModal = () => {
    this.setState({toggleIframeModal: !this.state.toggleIframeModal})
  }

  render() {
    return super.render( 
      <div className="col-sm-6 col-md-4">
        <div className={`d-block ${this.context.edit? '' : 'd-sm-none'}`}>
          <TextEditable 
            isString
            role={ROLES.mod}
            name="title"
            id={this.props.onBuildItemName(this.props.index, "title")}
            placeholder="Enter title..."
            {...this.state.textElementsProps}
            edit={this.context.edit} 
            is_input_text />
        </div>
        <div style={!this.context.edit && this.state.toggleIframeModal? styles.youtubeVisible : styles.youtubeInVisible}>
            <TextEditable 
              isIframe
              iframeOptions={{
                autoPlay: true,
                showIframe: !this.context.edit && this.state.toggleIframeModal,
                iframeStyle: IFRAME_STYLES.inline
              }}
              role={ROLES.mod}
              name="iframe_src"
              id={this.props.onBuildItemName(this.props.index, "iframe_src")}
              placeholder="Enter youtube video id..."
              {...this.state.textElementsProps}
              edit={this.context.edit} 
              is_input_text />
        </div>
        <div
          style={{
            height: "165px",
            width: "100%",
            display: !this.context.edit && this.state.toggleIframeModal? "none" : "flex",
            flexDirection: "column",
            justifycontent: "center",
            alignItems: "center",
            position: "relative"
          }}
        >
          <div style={{
            position: "relative", width: "100%", height: "100%"
            }}>
            <ImageEditable 
              name="photo"
              id={this.props.onBuildItemName(this.props.index, "photo")}
              {...this.state.imageElementsProps}
              edit={this.context.edit}
              spinnerWidth={50}
              spinnerHeight={50}
              spinnerThickness={7}
              spinnerRunnerColor="#f33"
              style={{
                width: "100%",
                minHeight: "100%"
              }}
              emptyWidth="100%"
              emptyHeight="100%"
              add_overlay={!this.state.page || this.context.edit} />
            <div className="btn-center play-button" onClick={this.toggleIframeModal}>
              <i className="fa fa-play d-block d-sm-none" />
              <i className="fa fa-2x fa-play-circle-o d-none d-sm-block" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  youtubeVisible: {
    position: "relative",
    width: "100%", height: "165px",
    background: "#000"
  },
  youtubeInVisible: {
    width: "100%"
  }
}

export default ItemVideo;
