import React, { useContext } from "react";
import { lastValueOrThis, isNullOrEmpty } from "../../../both/Functions";
import ImageEditable from "../editables/ImageEditable";
import { initial } from "lodash";
import EditableStateContext from "../editables/EditableStateContext";
import Page from "../Page";

class Item extends Page {
  static contextType = EditableStateContext
  constructor(props, context) {
    super(props, context)
    
  }

  componentDidMount() {
    this.props.refGetter(this)
    this.init(this.state.pageOptions)
  }

  init = (pageOptions) => {
    if((this.state.page && this.state.page.id) || (this.props.page && this.props.page.id)) {
      console.log("WeTheBest")
      this.loadPage(this.state.page || this.props.page, pageOptions)

    } else if(this.props.page && !this.state.page) {
      this.setState({page: this.props.page})
    }
  }

  render(child) {
    return (
      <>
        {child}
      </>
    );
  }
}

export default Item;