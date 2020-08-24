import React from "react";
import ImageEditable from "../editables/ImageEditable";
import EditableStateContext from "../editables/EditableStateContext";
import Item from "./Item";
import { ROLES, EMPTY_PROFILE_PHOTO } from "../../../both/Constants";
import TextEditable from "../editables/TextEditable";

class ItemTeamMember extends Item {
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

  render() {
    return (
      <div className="col-6 col-sm-4 col-md-3">
        <div className="team-member" style={{overflow: !this.context.edit? "hidden" : "auto"}}>
          <div className="desc d-none d-md-block" style={{position: !this.context.edit? "absolute" : "relative"}}>
            <h4 style={{textAlign: "center", marginBottom: "5px"}}>
              <TextEditable 
                isString
                role={ROLES.mod}
                name="title"
                id={this.props.onBuildItemName(this.props.index, "title")}
                placeholder="Member name..."
                {...this.state.textElementsProps}
                edit={this.context.edit} 
                is_input_text />
            </h4>
            <h5>
              <TextEditable 
                isString
                role={ROLES.mod}
                name="description"
                id={this.props.onBuildItemName(this.props.index, "description")}
                placeholder="Member role..."
                {...this.state.textElementsProps}
                edit={this.context.edit} />
            </h5>
          </div>
          <div style={{width: "100%", height: !this.context.edit? "100%" : "115px"}}>
            <ImageEditable
              isPointer
              role={ROLES.admins}
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
                height: "100%"
              }}
              imgStyle={{
                width: "100%",
                height: "auto"
              }}
              add_overlay={!this.state.page || !this.state.page.id || this.context.edit}
              placeholder={EMPTY_PROFILE_PHOTO}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ItemTeamMember;