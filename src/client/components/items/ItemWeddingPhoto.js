import React, { useContext } from "react";
import { lastValueOrThis, isNullOrEmpty } from "../../../both/Functions";
import ImageEditable from "../editables/ImageEditable";
import { initial } from "lodash";
import EditableStateContext from "../editables/EditableStateContext";
import Item from "./Item";

class ItemWeddingPhoto extends Item {
  static contextType = EditableStateContext
  constructor(props, context) {
    super(props, context)
    
  }

  componentDidMount() {
    console.log("ItemWeddingPhotos", this.context)
    this.setState({name: ("aaa" + Math.random()).replace(".", "")})
  }

  heights = [300, 305, 350, 500, 550, 650, 600, 700]

  pageOptions = {
    no_text: true, 
    no_video: true, 
    no_iframe: true, 
    no_list: true,
    image_key: ["photo"]
  }

  render() {
    return super.render(this.pageOptions, 
      <div>
        <a href={""}>
          <ImageEditable 
            key={this.props.key}
            edit={lastValueOrThis(this.context, "edit", false)}
            name={"photo"}
            {...this.context.imageElementsProps}
            spinnerWidth={50}
            spinnerHeight={50}
            spinnerThickness={7}
            spinnerRunnerColor="#f33"
            style={{height: this.heights[Math.floor(Math.random() * this.heights.length)]}} />
        </a>
      </div>
    )
  }
}

export default ItemWeddingPhoto;
