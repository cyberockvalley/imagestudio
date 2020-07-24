import React from "react";
import Item from "./Item";
import TextEditable from "../editables/TextEditable";
import ImageEditable from "../editables/ImageEditable";
import EditableStateContext from "../editables/EditableStateContext";
import { PAGE_404, ROLES } from "../../../both/Constants";
import { Link } from "react-router-dom";

const $ = require('jquery')


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

  getUnique = (name) => {
    return this.state.page && this.state.page.get("slug")? this.state.page.get("slug") : this.props.onBuildItemName(this.props.index, name)
  }

  getPageLink = () => {
    if(this.state.page) {
      return "/product/" + this.state.page.get("slug")

    } else {
      return "/" + PAGE_404
    }
  }

  render() {
    console.log("UploadTracker", "ShopItem", this.getPageLink(), this.props.index, this.props.onBuildItemName(this.props.index, "featured_image"))
    return super.render(
      <div className="col-6 col-sm-4 col-md-3" style={this.context.edit? {border: "1px solid #bcbcbc"} : {}}>
        <a href={!this.context.edit? this.getPageLink()  : "javascript:void(0)"} className="product-card">
          <div className="product-card__image-container">
            <div className="product-card__image-wrapper">
              <div
                className="product-card__image js"
                style={{
                  maxWidth: "235px"
                }}
              >
                <div
                  style={{
                    paddingTop: this.context.edit? 0 : "66.66666666666666%"
                  }}
                >
                  <ImageEditable
                    isPointer
                    className="product-card__image"
                    role={ROLES.mod}
                    name="featured_image"
                    id={this.getUnique("featured_image")}
                    {...this.state.imageElementsProps}
                    edit={this.context.edit}
                    link={this.getPageLink()}
                    spinnerWidth={50}
                    spinnerHeight={50}
                    spinnerThickness={7}
                    spinnerRunnerColor="#f33"
                    style={{
                      width: "100%",
                      height: "100%",
                      minHeight: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0
                    }}
                    add_overlay={!this.state.page || !this.state.page.id || this.context.edit}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="product-card__info">
            <div className="product-card__name">
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
            <div className="product-card__price">
              <span className="visually-hidden">Regular price</span>
              $<TextEditable 
                role={ROLES.mod}
                name="price"
                id={this.props.onBuildItemName(this.props.index, "price")}
                placeholder="Enter Product price..."
                {...this.state.textElementsProps}
                edit={this.context.edit} 
                is_input_text />
            </div>
          </div>
          {
            !this.context.edit?
            <div className="product-card__overlay d-none d-md-block">
            <span className="btn product-card__overlay-btn ">View</span>
            <span
              className="htusb-ui-boost htusb-ui-coll-boost"
            ></span>
          </div>
          : null
          }
        </a>
      </div>
    )
  }
}

export default ItemShopSection1