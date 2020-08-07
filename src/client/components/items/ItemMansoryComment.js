import React from "react";
import { lastValueOrThis, isNullOrEmpty, isValidEmail } from "../../../both/Functions";
import ImageEditable from "../editables/ImageEditable";
import EditableStateContext from "../editables/EditableStateContext";
import Item from "./Item";
import TextEditable from "../editables/TextEditable";
import { ROLES, EMPTY_PROFILE_PHOTO } from "../../../both/Constants";
const dateFormat = require('dateformat')

class ItemMansoryComment extends Item {
  static contextType = EditableStateContext
  constructor(props, context) {
    super(props, context)
    
  }

  componentDidMount() {
    this.setState({pageOptions: this.pageOptions, edit: this.props.page.singleEdit || this.props.edit})
    super.componentDidMount()
  }

  pageOptions = {
    no_text: true, 
    no_video: true, 
    no_iframe: true, 
    no_list: true
  }

  getDate = () => {
    return this.state.page && this.state.page.get? dateFormat(this.state.page.get("createdAt"), "m/d/yyyy") : ""
  }

  getEdit = () => {
    return this.state? this.state.edit : false
  }
  
  saveReview = () => {
    //this.handleEditOrSaveButtonClick
    var errors = 0
    var errorsMap = {
      comment_fullname_error: null,
      comment_email_error: null,
      comment_text_error: null,
      comment_ratings_error: null
    }
    //clear the errors
    this.setState({errorsMap})
    //feature image
    /*
    if(!this.editorsMap["featured_image"] || !this.editorsMap["featured_image"].detailsHasChanged()) {
      errors++
      errorsMap.featured_image_error = "Please select a profile image"
    }*/

    //name
    if(!this.editorsMap["comment_fullname"] || !this.editorsMap["comment_fullname"].detailsHasChanged()) {
      errors++
      errorsMap.comment_fullname_error = "Please enter your name"
    }

    //email
    if(!this.editorsMap["comment_email"] || !this.editorsMap["comment_email"].detailsHasChanged()) {
      errors++
      errorsMap.comment_email_error = "Please enter your email"

    } else if(!this.editorsMap["comment_email"].isValid()) {
      errors++
      errorsMap.comment_email_error = "Please enter a valid email"
    }

    //review
    if(!this.editorsMap["comment_text"] || !this.editorsMap["comment_text"].detailsHasChanged()) {
      errors++
      errorsMap.comment_text_error = "Pleae enter your comment"
    }

    if(errors == 0) {
      this.handleEditOrSaveButtonClick()

    } else {
      this.setState(errorsMap)
    }
  }

  render() {
    return super.render(
      <div className="masonry-comment">
        <ImageEditable
          isPointer
          role={ROLES.anonymous}
          name="featured_image"
          id={this.props.onBuildItemName(this.props.index, "featured_image")}
          {...this.state.imageElementsProps}
          edit={this.getEdit()}
          spinnerWidth={50}
          spinnerHeight={50}
          spinnerThickness={7}
          spinnerRunnerColor="#f33"
          style={{
            width: "100%",
            height: !this.state.page || !this.state.page.id? "250px" : "auto"
          }}
          add_overlay={!this.state.page || !this.state.page.id || this.getEdit()}
          placeholder={EMPTY_PROFILE_PHOTO}
        />
        {
          this.state.featured_image_error? 
          <div className="invalid-feedback d-block">{this.state.featured_image_error}</div> : null
        }
        <div>
          <div className="name">
            <TextEditable 
                role={ROLES.anonymous}
                name="comment_fullname"
                id={this.props.onBuildItemName(this.props.index, "comment_fullname")}
                placeholder="Name..."
                {...this.state.textElementsProps}
                edit={this.getEdit()}
                is_input_text />
            {
              this.state.comment_fullname_error? 
              <div className="invalid-feedback d-block">{this.state.comment_fullname_error}</div> : null
            }
          .</div>
          <div className="name">
            <TextEditable 
                role={ROLES.anonymous}
                notReadable={true}
                name="comment_email"
                id={this.props.onBuildItemName(this.props.index, "comment_email")}
                placeholder="Email..."
                {...this.state.textElementsProps}
                edit={this.getEdit()} 
                is_input_text
                validityChecker={isValidEmail} />
            {
              this.state.comment_email_error? 
              <div className="invalid-feedback d-block">{this.state.comment_email_error}</div> : null
            }
          </div>
          <div className="date">{this.getDate()}</div>
          <div className="stars">
            <i className="fa star fa-star" />
            <i className="fa star fa-star" />
            <i className="fa star fa-star" />
            <i className="fa star fa-star" />
            <i className="fa star fa-star" />
          </div>
          <p>
            <TextEditable 
              role={ROLES.anonymous}
              name="comment_text"
              id={this.props.onBuildItemName(this.props.index, "comment_text")}
              placeholder="Enter comment..."
              {...this.state.textElementsProps}
              edit={this.getEdit()} />
            {
              this.state.comment_text_error? 
              <div className="invalid-feedback d-block">{this.state.comment_text_error}</div> : null
            }
          </p>
          <div>
              <button className={`btn load-more ${this.state.edit? "" : "d-none"}`} onClick={this.saveReview}>Save review</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemMansoryComment;
