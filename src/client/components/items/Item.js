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

  init = () => {
    if(this.props.pageLocalKey && 
        (!this.state.page || 
          (!isNullOrEmpty(this.state.page.local_key) && this.state.page.local_key != this.props.pageLocalKey)
        )
      ) {
      this.getPage(this.props.pageLocalKey, {
        isLocal
      })
    }
  }

  render(child) {
    this.init()
    return (
      <>
        {child}
      </>
    );
  }
}

export default Item;