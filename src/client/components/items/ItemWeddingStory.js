import React from "react";
import Item from "./Item";
import EditableStateContext from "../editables/EditableStateContext";
import ImageEditable from "../editables/ImageEditable";
import TextEditable from "../editables/TextEditable";
import { PAGE_404, ROLES } from "../../../both/Constants";
import BroadLink from "../widgets/BroadLink";
import { Link } from "react-router-dom";

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
      return "/" + PAGE_404
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
                emptyWidth="100%"
                emptyHeight="400px"
                add_overlay={!this.state.page || !this.state.page.id || this.context.edit}
              />
              <div className="fade-box fade-in-down" style={{zIndex:1}}>
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
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemWeddingStory;
