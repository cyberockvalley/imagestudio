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
    this.state = {...this.state, lensIndex: this.props.index, lensNavigator: this.props.navigator}
    this.state.lensImageElementsProps = this.state.imageElementsProps
    
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
    this.setState({lensNavigator: this.props.navigator, lensIndex: this.props.index, lensImageElementsProps: this.state.imageElementsProps, enlargeImage: true})
  }

  closeImage = () => {
    this.setState({lensNavigator: this.props.navigator, lensIndex: this.props.index, lensImageElementsProps: this.state.imageElementsProps, enlargeImage: false})
  }

  prevImage = () => {
    var neigbour = this.state.lensNavigator.getPrev()
    if(!neigbour) neigbour = this.state.lensNavigator.getLast()
    if(neigbour) {
      this.setState({refresh: true})
      this.setState({lensNavigator: neigbour.props.navigator, lensIndex: neigbour.props.index, lensImageElementsProps: neigbour.state.imageElementsProps, refresh: false})
    } else {
      this.closeImage()
    }
  }

  nextImage = () => {
    var neigbour = this.state.lensNavigator.getNext()
    if(!neigbour) neigbour = this.state.lensNavigator.getFirst()
    if(neigbour) {
      this.setState({refresh: true})
      this.setState({lensNavigator: neigbour.props.navigator, lensIndex: neigbour.props.index, lensImageElementsProps: neigbour.state.imageElementsProps, refresh: false})
    } else {
      this.closeImage()
    }
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
              imgClasses={"no-border"}
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
                      <span onClick={this.prevImage} className={`fa fa-3x fa-arrow-circle-left action white`}></span>
                  </div>
                  <div style={styles.modalCenterWidget}>
                      <div style={styles.modalIframe}>
                          {
                            !this.state.refresh?
                            <ImageEditable 
                            key={this.state.lensIndex}
                            name="photo"
                            id={this.props.onBuildItemName(this.state.lensIndex, "photo")}
                            {...this.state.lensImageElementsProps}
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
                            }} /> : null
                          }
                      </div>
                  </div>
                  <div style={styles.modalRightWidget}>
                      <span onClick={this.closeImage} className="fa fa-3x fa-times-circle action white"></span>
                      <span onClick={this.nextImage} className={`fa fa-3x fa-arrow-circle-right action white`}></span>
                      <span className={`fa fa-3x fa-arrow-circle-left action white`} style={{visibility: 'hidden'}}></span>
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
