import React from "react";
import { lastValueOrThis, isNullOrEmpty, roundTo } from "../../../both/Functions";
import ImageEditable from "../editables/ImageEditable";
import EditableStateContext from "../editables/EditableStateContext";
import Item from "./Item";
import { IMAGE_PICTURE_SOURCE_EXTENSIONS, IMAGE_PROCCESSORS } from "../../../both/Constants";

class ItemEffectExample extends Item {
  static contextType = EditableStateContext
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    this.setState({pageOptions: this.pageOptions, sliderXpos: 50})
    super.componentDidMount()

  }

  pageOptions = {
    no_text: true, 
    no_video: true, 
    no_iframe: true, 
    no_list: true
  }

  getContainer = () => {
    return $(`.${this.props.onBuildItemName(this.props.index, "class")}`)[0]
  }

  handleMouseDown = e => {
    e.preventDefault()
    this.updateSlider(e)
    window.addEventListener('mousemove', this.updateSlider)
    window.addEventListener('mouseup', this.stopSlider)

    
    window.addEventListener('touchmove', this.updateSlider)
    window.addEventListener('touchend', this.stopSlider)
  }

  stopSlider = e => {
    window.removeEventListener('mousemove', this.updateSlider)
    window.removeEventListener('touchmove', this.updateSlider)
  }

  updateSlider = e => {
    if(this.context.edit) return
    const xPos = e.pageX || e.touches[0].pageX
    const container = this.getContainer()
    var offsetX = container.offsetLeft
    var width = container.clientWidth
    var sliderPercentage = roundTo(((xPos - offsetX) / width) * 100, 1)
    //console.log("handleMouseDown", "xPos", xPos)
    //console.log("handleMouseDown", "offsetX", offsetX)
    //console.log("handleMouseDown", "clientWidth", width)
    //console.log("handleMouseDown", "sliderPercentage", sliderPercentage)
    if(sliderPercentage < 0) {
      sliderPercentage = 0

    } else if(sliderPercentage > 100) {
      sliderPercentage = 100
    }
    
    this.setState({sliderXpos: sliderPercentage, xPos: xPos, offsetX: offsetX, width: width})
  }

  events = {
    onClick: this.handleMouseDown
  }
  getEvents = () => {
    if(this.context.edit) return null
    return this.events
  }

  render() {
    return super.render(
      <div className={`effect col-11 col-md-8 effect-height-1 ${this.props.onBuildItemName(this.props.index, "class")}`} 
      style={this.context.edit? {
        display: "flex", flexDirection: "row"
      } : {}} {...(this.context.edit? null : {onMouseDown: this.handleMouseDown, onTouchStart: this.handleMouseDown})}>
        
        <ImageEditable 
          name="photo1"
          id={this.props.onBuildItemName(this.props.index, "photo1")}
          {...this.state.imageElementsProps}
          edit={this.context.edit}
          spinnerWidth={50}
          spinnerHeight={50}
          spinnerThickness={7}
          spinnerRunnerColor="#f33"
          className={this.context.edit? "" : "clip"}
          style={{
            height: "100%",
            position: this.context.edit? "relative" : "absolute",
            clipPath: this.context.edit? "none" : `polygon(0 0, ${this.state.sliderXpos}% 0, ${this.state.sliderXpos}% 100%, 0 100%)`
          }}
          emptyWidth="100%"
          emptyHeight="100%"
          add_overlay={!this.state.page || !this.state.page.id || this.context.edit}
          display={{
            image_exts: IMAGE_PICTURE_SOURCE_EXTENSIONS,
            default: {queries: `w=300`, proccessors: IMAGE_PROCCESSORS},
            manifests: [
              {at: 300, queries: `w=300`, proccessors: IMAGE_PROCCESSORS},
              {at: 576, queries: `w=576`, proccessors: IMAGE_PROCCESSORS},
              {at: 768, queries: `w=768`, proccessors: IMAGE_PROCCESSORS},
              {at: 992, queries: `w=992`, proccessors: IMAGE_PROCCESSORS}
            ]
          }} />
        <ImageEditable 
          name="photo2"
          id={this.props.onBuildItemName(this.props.index, "photo2")}
          {...this.state.imageElementsProps}
          edit={this.context.edit}
          spinnerWidth={50}
          spinnerHeight={50}
          spinnerThickness={7}
          spinnerRunnerColor="#f33"
          className={this.context.edit? "" : "clip"}
          style={{
            height: "100%",
            position: this.context.edit? "relative" : "absolute",
            clipPath: this.context.edit? "none" : `polygon(${this.state.sliderXpos}% 0, 100% 0, 100% 100%, ${this.state.sliderXpos}% 100%)`
          }}
          emptyWidth="100%"
          emptyHeight="100%"
          add_overlay={!this.state.page || !this.state.page.id || this.context.edit} 
          display={{
            image_exts: IMAGE_PICTURE_SOURCE_EXTENSIONS,
            default: {queries: `w=300`, proccessors: IMAGE_PROCCESSORS},
            manifests: [
              {at: 300, queries: `w=300`, proccessors: IMAGE_PROCCESSORS},
              {at: 576, queries: `w=576`, proccessors: IMAGE_PROCCESSORS},
              {at: 768, queries: `w=768`, proccessors: IMAGE_PROCCESSORS},
              {at: 992, queries: `w=992`, proccessors: IMAGE_PROCCESSORS}
            ]
          }}/>
        <div
          className="slider"
          style={{
            left: `${this.state.sliderXpos}%`
          }}
        >
          <span className="left-arrow fa fa-arrow-left d-none" />
          <span className="right-arrow fa fa-arrow-right d-none" />
        </div>
      </div>
    );
  }
}

export default ItemEffectExample;
