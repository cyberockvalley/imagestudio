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

  state = {
    name: ("aaa" + Math.random()).replace(".", "")
  }

  componentDidMount() {
    console.log("Items", this.context)
  }

  init = (pageOptions) => {
    if(!this.state.page && this.props.page) {
        this.loadPage(this.props.page, pageOptions)
    }
  }

  render(pageOptions, child) {
    this.init(pageOptions)
    return (
      <>
        {child}
      </>
    );
  }
}

export default Item;