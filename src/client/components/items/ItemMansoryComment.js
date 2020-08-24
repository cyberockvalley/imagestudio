import React from "react";
import { lastValueOrThis, isNullOrEmpty, isValidEmail } from "../../../both/Functions";
import ImageEditable from "../editables/ImageEditable";
import EditableStateContext from "../editables/EditableStateContext";
import Item from "./Item";
import TextEditable from "../editables/TextEditable";
import { ROLES, EMPTY_PROFILE_PHOTO, GOOGLE_CAPTCHA_SITE_KEY } from "../../../both/Constants";
const dateFormat = require('dateformat')
const numberToWords = require('number-to-words')

class ItemMansoryComment extends Item {
  static contextType = EditableStateContext
  constructor(props, context) {
    super(props, context)
    this.ratingsHover = this.ratingsHover.bind()
    this.ratingsHoverOut = this.ratingsHoverOut.bind()
    this.ratingsClick = this.ratingsClick.bind()
    
  }

  getRootId = () => {
    return encodeURIComponent(this.props.onBuildItemName(numberToWords.toWords(this.props.index), ""))
  }

  componentDidMount() {
    this.setState({
      pageOptions: this.pageOptions, 
      edit: this.props.page.singleEdit || this.props.edit,
      botKey: GOOGLE_CAPTCHA_SITE_KEY
    })
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
      anonymous_comment_fullname_error: null,
      anonymous_comment_email_error: null,
      anonymous_comment_text_error: null,
      ratings_error: null
    }
    //clear the errors
    this.setState({errorsMap})
    //feature image
    /*
    if(!this.editorsMap["anonymous_comment_image"] || !this.editorsMap["anonymous_comment_image"].detailsHasChanged()) {
      errors++
      errorsMap.anonymous_comment_image_error = "Please select a profile image"
    }*/

    //name
    if(!this.editorsMap["anonymous_comment_fullname"] || !this.editorsMap["anonymous_comment_fullname"].detailsHasChanged()) {
      errors++
      errorsMap.anonymous_comment_fullname_error = "Please enter your name"
    }

    //email
    if(!this.editorsMap["anonymous_comment_email"] || !this.editorsMap["anonymous_comment_email"].detailsHasChanged()) {
      errors++
      errorsMap.anonymous_comment_email_error = "Please enter your email"

    } else if(!this.editorsMap["anonymous_comment_email"].isValid()) {
      errors++
      errorsMap.anonymous_comment_email_error = "Please enter a valid email"
    }

    //review
    if(!this.editorsMap["anonymous_comment_text"] || !this.editorsMap["anonymous_comment_text"].detailsHasChanged()) {
      errors++
      errorsMap.anonymous_comment_text_error = "Please enter your comment"
    }

    //ratings
    if(!this.state.page.get("ratings")) {
      errors++
      errorsMap.ratings_error = "Please select a rating"
    }

    if(errors == 0) {
      this.handleEditOrSaveButtonClick()

    } else {
      this.setState(errorsMap)
    }
  }

  getRatings = () => {
    return this.state && this.state.page && this.state.page.get("ratings")? this.state.page.get("ratings") : 0
  }

  ratings = 0
  ratingsHover = e => {
    this.ratings = this.getRatings()
    var starNumber = parseInt(e.target.getAttribute("dataNumber"))
    var page = this.state.page
    page.set("ratings", starNumber)
    this.setState({page: page})
  }
  
  ratingsHoverOut = e => {
    var page = this.state.page
    page.set("ratings", this.ratings)
    this.setState({page: page})
  }

  ratingsClick = e => {
    var starNumber = parseInt(e.target.getAttribute("dataNumber"))
    this.ratings = starNumber
    var page = this.state.page
    page.set("ratings", starNumber)
    this.setState({page: page})
  }

  render() {
    return super.render(
      <div id={this.getRootId()} className="masonry-comment">
        <ImageEditable
          role={ROLES.anonymous}
          name="anonymous_comment_image"
          id={this.props.onBuildItemName(this.props.index, "anonymous_comment_image")}
          {...this.state.imageElementsProps}
          edit={this.getEdit()}
          spinnerWidth={50}
          spinnerHeight={50}
          spinnerThickness={7}
          spinnerRunnerColor="#f33"
          style={{
            width: "100%",
            height: "auto"
          }}
          placeholder={EMPTY_PROFILE_PHOTO}
          botKey={GOOGLE_CAPTCHA_SITE_KEY}
        />
        {
          this.state.anonymous_comment_image_error? 
          <div className="invalid-feedback d-block">{this.state.anonymous_comment_image_error}</div> : null
        }
        <div>
          <div className="name">
            <TextEditable 
                role={ROLES.anonymous}
                name="anonymous_comment_fullname"
                id={this.props.onBuildItemName(this.props.index, "anonymous_comment_fullname")}
                placeholder="Name..."
                {...this.state.textElementsProps}
                edit={this.getEdit()}
                is_input_text
                botKey={GOOGLE_CAPTCHA_SITE_KEY} />
            {
              this.state.anonymous_comment_fullname_error? 
              <div className="invalid-feedback d-block">{this.state.anonymous_comment_fullname_error}</div> : null
            }
          .</div>
          <div className="name" style={!this.context.edit? {display: "none"} : {}}>
            <TextEditable notReadable
                role={ROLES.anonymous}
                name="anonymous_comment_email"
                id={this.props.onBuildItemName(this.props.index, "anonymous_comment_email")}
                placeholder="Email..."
                {...this.state.textElementsProps}
                edit={this.getEdit()} 
                is_input_text
                botKey={GOOGLE_CAPTCHA_SITE_KEY}
                validityChecker={isValidEmail} />
            {
              this.state.anonymous_comment_email_error? 
              <div className="invalid-feedback d-block">{this.state.anonymous_comment_email_error}</div> : null
            }
          </div>
          <div className="date">{this.getDate()}</div>
          <div className="stars">
            {
              [1,2,3,4,5].map((value, index) => {
                return <i className={`fa star ${this.getRatings() - value < 0? "fa-star-o" : "fa-star"}`} 
                onMouseOver={!this.getEdit()? null : this.ratingsHover} 
                onMouseOut={!this.getEdit()? null : this.ratingsHoverOut} 
                onClick={!this.getEdit()? null : this.ratingsClick} 
                dataNumber={value} />
              })
            }
          </div>
            {
              this.state.ratings_error? 
              <div className="invalid-feedback d-block">{this.state.ratings_error}</div> : null
            }
          <p>
            <TextEditable 
              role={ROLES.anonymous}
              name="anonymous_comment_text"
              id={this.props.onBuildItemName(this.props.index, "anonymous_comment_text")}
              placeholder="Enter comment..."
              {...this.state.textElementsProps}
              edit={this.getEdit()}
              botKey={GOOGLE_CAPTCHA_SITE_KEY} />
            {
              this.state.anonymous_comment_text_error? 
              <div className="invalid-feedback d-block">{this.state.anonymous_comment_text_error}</div> : null
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

export default React.memo(ItemMansoryComment);
