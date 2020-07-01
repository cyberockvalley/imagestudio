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

  render() {
    return super.render(
      <div>
        <a href={""}>
          <ImageEditable 
            key={this.props.key}
            name={"nsn"}
            {...this.state.imageElementsProps}
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
