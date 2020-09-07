import React from "react";
import { lastValueOrThis, isNullOrEmpty } from "../../../both/Functions";
import ImageEditable from "../editables/ImageEditable";
import EditableStateContext from "../editables/EditableStateContext";
import Item from "./Item";
import { IMAGE_PROCCESSORS, IMAGE_PICTURE_SOURCE_EXTENSIONS } from "../../../both/Constants";
import ModalView from "../widgets/ModalView";

class ItemWeddingPhoto extends Item {
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

  enlarge = () => {
    this.setState({enlargeImage: true})
  }

  closeImage = () => {
    this.setState({enlargeImage: false})
  }

  render() {
    return super.render( 
      <>
        <div onClick={this.enlarge} style={{width: "100%", minHeight: "100%"}}>
          <ImageEditable 
              className="action"
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
              emptyHeight="400px"
              add_overlay={!this.state.page || !this.state.page.id || this.context.edit}
              beforeLoadClasses={`lh${["200", "250", "300"][parseInt(Math.random() * 3)]}`}
              display={{
                image_exts: IMAGE_PICTURE_SOURCE_EXTENSIONS,
                default: {queries: `w=150`, proccessors: IMAGE_PROCCESSORS},
                manifests: [
                  {at: 150, queries: `w=150`, proccessors: IMAGE_PROCCESSORS},
                  {at: 400, queries: `w=412`, proccessors: IMAGE_PROCCESSORS}
                ]
              }} />
          </div>
          <ModalView open={this.state.enlargeImage} onClose={this.closeImage}>
              <div style={styles.modalContainer}>
                  <div style={styles.modalLeftWidget}>
                      <span className={`fa fa-3x fa-arrow-circle-left action white d-none`}></span>
                  </div>
                  <div style={styles.modalCenterWidget}>
                      <div style={styles.modalIframe}>
                          <ImageEditable 
                            name="photo"
                            id={this.props.onBuildItemName(this.props.index, "photo")}
                            {...this.state.imageElementsProps}
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
                            display={{
                              image_exts: IMAGE_PICTURE_SOURCE_EXTENSIONS,
                              default: {queries: `w=300`, proccessors: IMAGE_PROCCESSORS},
                              manifests: [
                                {at: 300, queries: `w=300`, proccessors: IMAGE_PROCCESSORS},
                                {at: 400, queries: `w=412`, proccessors: IMAGE_PROCCESSORS},
                                {at: 768, queries: `w=768`, proccessors: IMAGE_PROCCESSORS},
                                {at: 992, queries: `w=992`, proccessors: IMAGE_PROCCESSORS}
                              ]
                            }} />
                      </div>
                  </div>
                  <div style={styles.modalRightWidget}>
                      <span className="fa fa-3x fa-times-circle action white" onClick={this.closeImage}></span>
                  </div>
              </div>
          </ModalView>
      </>
    )
  }
}

const styles = {
  modalContainer: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: "100%"
  },
  modalLeftWidget: {
      padding: "15px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "15%",
      height: "100%"

  },
  modalRightWidget: {
      padding: "15px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      width: "15%",
      height: "100%"

  },
  modalCenterWidget: {
      padding: "50px 0px",
      width: "70%",
      height: "100%"
  },
  modalIframe: {
      background: "#000",
      width: "100%",
      height: "100%"
  }
}

export default ItemWeddingPhoto;
