import React from "react";
import { Link } from "react-router-dom";
import Item from "./Item";
import TextEditable from "../editables/TextEditable";
import ImageEditable from "../editables/ImageEditable";
import EditableStateContext from "../editables/EditableStateContext";
import { PAGE_404, ROLES } from "../../../both/Constants";
import BroadLink from "../widgets/BroadLink";

class ItemShopSection1 extends Item {
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

  getPageLink = () => {
    if(this.state.page) {
      return "/product/" + this.state.page.get("slug")

    } else {
      return "/" + PAGE_404
    }
  }

  render() {
    console.log("Shop4", this.context.edit)
    return super.render(
      <div className="col-6 col-md-4">
        <BroadLink 
        href={this.context.edit? "javascript:void()" : null}
        to={this.context.edit? null : this.getPageLink()}>
          <div>
            <ImageEditable
                isPointer
                role={ROLES.mod}
                name="featured_image"
                id={this.props.onBuildItemName(this.props.index, "featured_image")}
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
                emptyHeight="200px"
                add_overlay={!this.state.page || !this.state.page.id || this.context.edit}
              />
            <div className="product-title">
              <TextEditable 
                    isString
                    role={ROLES.mod}
                    name="title"
                    id={this.props.onBuildItemName(this.props.index, "title")}
                    placeholder="Enter Product title..."
                    {...this.state.textElementsProps}
                    edit={this.context.edit} 
                    is_input_text />
            </div>
          </div>
        </BroadLink>
      </div>
    );
  }
}

export default ItemShopSection1;
