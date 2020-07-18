import React, { useContext } from "react";
import { lastValueOrThis, isNullOrEmpty } from "../../../both/Functions";
import ImageEditable from "../editables/ImageEditable";
import EditableStateContext from "../editables/EditableStateContext";
import Item from "./Item";

class ItemWeddingPhoto extends Item {
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
    return super.render( 
      <ImageEditable 
            name="photo"
            id={this.props.onBuildItemName(this.props.index, "photo")}
            {...this.state.imageElementsProps}
            edit={this.context.edit}
            spinnerWidth={50}
            spinnerHeight={50}
            spinnerThickness={7}
            spinnerRunnerColor="#f33"
/*
            style={(this.state.page && !this.state.page.id) || this.context.edit?{} : {height: 300}}
            add_overlay={(this.state.page && !this.state.page.id) || this.context.edit}*/ />
    )
  }
}

export default ItemWeddingPhoto;
