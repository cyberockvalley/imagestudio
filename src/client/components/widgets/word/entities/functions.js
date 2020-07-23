import React from 'react'
import draftToHtml from 'draftjs-to-html'
import WordProcessorSettings from '../WordProcessorSettings';

export const customDraftToHtml = rawContentState => {
  return draftToHtml(rawContentState, {}, false, customEntityTransform)
}

const customEntityTransform = (entity, text) => {
  console.log("customEntity", entity, text)
  if (entity.type == WordProcessorSettings.ToolBar.entities.image) {
    const { gridItemsSpacing, alt} = entity.data
    var justify = "center"
    if(entity.data.alignment == "left") {
      justify = "start"

    } else if(entity.data.alignment == "right") {
      justify = "end"

    }
    
    var children = ''
    entity.data.images.forEach(image => {
      children += `
      <div style="
        width: ${image.autoWidth? "auto" : image.width + image.widthType};
        height: ${image.autoHeight? "auto" : image.height + image.heightType};
        padding-right: ${gridItemsSpacing + "px"};
        padding-bottom: ${gridItemsSpacing + "px"}
    ">
        <img src="${image.src}" alt="${alt}" style="width: 100%; height: 100%" />
    </div>`
    })
    return `<div style="width: 100%; display: flex; justify-content: ${justify}">
      <div 
          style="display: flex; flex-wrap: wrap; width: ${entity.data.width}%">
          ${
            children
          }
      </div>
    </div>`
  }
}