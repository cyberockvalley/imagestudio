import React from "react";
import Item from "./Item";
import EditableStateContext from "../editables/EditableStateContext";
import ImageEditable from "../editables/ImageEditable";
import TextEditable from "../editables/TextEditable";
import { PAGE_404, ROLES, IMAGE_PICTURE_SOURCE_EXTENSIONS, IMAGE_PROCCESSORS } from "../../../both/Constants";

class ItemWeddingStory extends Item {
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

  getUnique = (name) => {
    return this.state.page && this.state.page.get("slug")? this.state.page.get("slug") : this.props.onBuildItemName(this.props.index, name)
  }

  getPageLink = () => {
    if(this.state.page) {
      return "/" + this.state.page.get("slug")

    } else {
      return PAGE_404
    }
  }

  render() {
    return super.render(
      <div key={this.props.key} className="col-sm-6 col-md-4 story-container">
        <div
          style={{
            width: "100%",
            height: "100%"
          }}
        >
          <div className="story">
          <a href={!this.context.edit? this.getPageLink()  : "/photo/#/"}>
              <ImageEditable
                isPointer
                role={ROLES.mod}
                name="featured_image"
                id={this.getUnique("featured_image")}
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
                beforeLoadClasses={`lh300`}
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
                }}
              />
              <div className="fade-box fade-in-down" style={{zIndex:1, top: this.context.edit? "20%" : "50%"}}>
                <h2 className="story-title">
                  <TextEditable 
                    isString
                    role={ROLES.mod}
                    name="title"
                    id={this.props.onBuildItemName(this.props.index, "title")}
                    placeholder="Enter Story title..."
                    {...this.state.textElementsProps}
                    edit={this.context.edit} 
                    is_input_text />
                </h2>
                <h2 className="story-title" style={{display: this.context.edit? "block" : "none"}}>
                  <TextEditable 
                    isString
                    role={ROLES.mod}
                    name="description"
                    id={this.props.onBuildItemName(this.props.index, "description")}
                    placeholder="Enter Story description..."
                    {...this.state.textElementsProps}
                    edit={this.context.edit} />
                </h2>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemWeddingStory;
