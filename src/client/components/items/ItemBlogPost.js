import React from "react";
import EditableStateContext from "../editables/EditableStateContext";
import ImageEditable from "../editables/ImageEditable";
import TextEditable from "../editables/TextEditable";
import { PAGE_404, ROLES } from "../../../both/Constants";
import { Link } from "react-router-dom";
import { truncText } from "../../../both/Functions";
import Item from "./Item";
const dateFormat = require('dateformat')

const MAX_DESCRIPTION_LENGTH = 300
class ItemBlogPost extends Item {
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
      return "/blog/" + this.state.page.get("slug")

    } else {
      return PAGE_404
    }
  }

  getPostDate = () => {
    //"dddd, mmmm dS, yyyy, h:MM:ss TT" => Saturday, June 9th, 2007, 5:46:21 PM
    //September 1, 2019 22:00
    //return "30.04.2020"
    return this.state.page && this.state.page.get? dateFormat(this.state.page.get("createdAt"), "mm.dd.yyyy") : ""
  }

  getCategory = () => {
    return "Our Blog";//Tips and Tricks
  }

  processDescription = description => {
    return truncText(description, MAX_DESCRIPTION_LENGTH, " [...]")
  }

  render() {
    return super.render(
      <div className="col-12">
        <div className="blog-box">
          <div className="thumb">
            <a href={!this.context.edit? this.getPageLink()  : "/blog/#/"}>
              <div className="blogPostCover" style={this.context.edit? {} : {zIndex: 1}}>
                <div>
                  <span className="btn-center blogPostCoverTitle">
                    {
                      this.state.page && this.state.page.get("title")? this.state.page.get("title") : ""
                    }
                  </span>
                </div>
              </div>
              <ImageEditable
                isPointer
                role={ROLES.mod}
                name="featured_image"
                id={this.getUnique("featured_image")}
                {...this.state.imageElementsProps}
                edit={this.context.edit}
                alt={this.context.elementsAttributes? this.context.elementsAttributes.title : ""}
                className="lazy"
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
            </a>
          </div>
          <div className="blog-title">
            <div className="row">
              <div className="col-12 col-md-8 col-md-push-4" style={{paddingTop: 10}}>
                <h4>
                  <TextEditable 
                    isString
                    role={ROLES.mod}
                    name="title"
                    id={this.props.onBuildItemName(this.props.index, "title")}
                    placeholder="Enter post title..."
                    {...this.state.textElementsProps}
                    edit={this.context.edit} 
                    is_input_text />
                </h4>
              </div>
              <div className="col-xs-12 col-md-4 col-md-pull-8">
                <small
                  style={{
                    lineHeight: "3em"
                  }}
                >
                  {`${this.getPostDate()} | ${this.getCategory()}`}
                </small>
              </div>
            </div>
          </div>
          <div className>
            <div className="shortDescription">
              <p>
                <TextEditable 
                  isString
                  role={ROLES.mod}
                  name="description"
                  id={this.props.onBuildItemName(this.props.index, "description")}
                  placeholder="Enter post description..."
                  {...this.state.textElementsProps}
                  edit={this.context.edit} 
                  onDisplayText={this.processDescription} />
              </p>
            </div>
            <div className="text-left">
              <Link to={this.getPageLink()}>
                READ MORE
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemBlogPost;
