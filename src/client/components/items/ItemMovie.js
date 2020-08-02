import React from "react";
import EditableStateContext from "../editables/EditableStateContext";
import Item from "./Item";
import TextEditable from "../editables/TextEditable";
import ImageEditable from "../editables/ImageEditable";
import { ROLES } from "../../../both/Constants";
import { IFRAME_STYLES } from "../widgets/IframeView";

class ItemMovie extends Item {
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
    console.log("toggleIframeModal", this.state.toggleIframeModal)
    this.setState({toggleIframeModal: !this.state.toggleIframeModal})
  }

  render() {
    return super.render( 
      <div className="col-12 col-sm-6 col-md-20p" style={this.context.edit?{height: "auto", display: "flex", flexDirection: "column"} : {}}>
        <div style={!this.state.page || this.context.edit?{
            height: "188px",
            width: "100%"} : {}} className="movie-img">
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
              height: "100%"
            }}
            emptyWidth="100%"
            emptyHeight="100%"
            add_overlay={!this.state.page || this.context.edit} />
        </div>
        <div className={this.context.edit? "" : "btn-center movie-info"} style={this.context.edit?styles.btnCenterEdit : styles.btnCenter}>
          <div className="caption-body">
            <div className="caption-desc">
              <TextEditable 
                role={ROLES.mod}
                name="short_description"
                id={this.props.onBuildItemName(this.props.index, "short_description")}
                placeholder="Short description..."
                {...this.state.textElementsProps}
                edit={this.context.edit} 
                is_input_text />
            </div>
            <div className="caption-title">
              <TextEditable 
                role={ROLES.mod}
                name="group_title"
                id={this.props.onBuildItemName(this.props.index, "group_title")}
                placeholder="Group title..."
                {...this.state.textElementsProps}
                edit={this.context.edit} 
                is_input_text />
              <br />
              <TextEditable 
                isString
                role={ROLES.mod}
                name="title"
                id={this.props.onBuildItemName(this.props.index, "title")}
                placeholder="Title..."
                {...this.state.textElementsProps}
                edit={this.context.edit} 
                is_input_text />
            </div>
            <TextEditable 
              isIframe
              iframeOptions={{
                autoPlay: false,
                showIframe: !this.context.edit && this.state.toggleIframeModal,
                iframeStyle: IFRAME_STYLES.modal,
                onIframeModalClose: this.toggleIframeModal
              }}
              role={ROLES.mod}
              name="iframe_src"
              id={this.props.onBuildItemName(this.props.index, "iframe_src")}
              placeholder="Enter youtube video id..."
              {...this.state.textElementsProps}
              edit={this.context.edit} 
              is_input_text />
            <div className="link-captions">
              <span
                className="cbp-lightbox action" onClick={this.toggleIframeModal}
              >
                <i className="rounded-x fa fa-2x fa-play-circle" />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  btnCenter: {height: "188px",width: "100%"},
  btnCenterEdit: {
    opacity: 1, height: "188px", width: "100%"
  }
}

export default ItemMovie;
