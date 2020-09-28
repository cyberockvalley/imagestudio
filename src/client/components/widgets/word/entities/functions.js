import React from 'react'
import draftToHtml from 'draftjs-to-html'
import WordProcessorSettings from '../WordProcessorSettings';
import { buildFileTags, getSrc } from '../../../editables/utils/imagefunc';
import { IMAGE_PICTURE_SOURCE_EXTENSIONS, IMAGE_PROCCESSORS } from '../../../../../both/Constants';


export const customDraftToHtml = rawContentState => {
  return draftToHtml(rawContentState, {}, false, customEntityTransform)
}

export const getSize = (maxWidth, containerWidth, isAuto, cssWidth, cssWidthType) => {
  if(isAuto || cssWidthType != "%") return maxWidth
  console.log("getSizeWB", cssWidth, containerWidth)
  if(containerWidth && !isNaN(containerWidth)) {
    cssWidth = (parseInt(cssWidth) * parseInt(containerWidth)) / 100
    console.log("getSizeWA", cssWidth, containerWidth)
  }
  var s = (parseInt(cssWidth) * maxWidth) / 100
  console.log("getSizeW", cssWidth, maxWidth, s)
  return s < 500? 500 : Math.round(s)
}

const customEntityTransform = (entity, text) => {
  //console.log("customEntity", JSON.stringify(entity), text)
  if (entity.type == WordProcessorSettings.ToolBar.entities.imageGrid || entity.type == WordProcessorSettings.ToolBar.entities.imageGrid2) {
    const { gridItemsSpacing, alt} = entity.data
    var justify = "center"
    if(entity.data.alignment == "left") {
      justify = "start"

    } else if(entity.data.alignment == "right") {
      justify = "end"

    }
    
    var children = ''
    entity.data.images.forEach(image => {
      const display = {
        image_exts: IMAGE_PICTURE_SOURCE_EXTENSIONS,
        default: {queries: `w=300`, proccessors: IMAGE_PROCCESSORS},
        manifests: [
          {at: 300, queries: `w=${getSize(300, entity.data.width, image.autoWidth, image.width, image.widthType)}`, proccessors: IMAGE_PROCCESSORS},
          {at: 576, queries: `w=${getSize(576, entity.data.width, image.autoWidth, image.width, image.widthType)}`, proccessors: IMAGE_PROCCESSORS},
          {at: 768, queries: `w=${getSize(768, entity.data.width, image.autoWidth, image.width, image.widthType)}`, proccessors: IMAGE_PROCCESSORS},
          {at: 992, queries: `w=${getSize(992, entity.data.width, image.autoWidth, image.width, image.widthType)}`, proccessors: IMAGE_PROCCESSORS},
          {at: 1200, queries: `w=${getSize(1200, entity.data.width, image.autoWidth, image.width, image.widthType)}`, proccessors: IMAGE_PROCCESSORS}
        ]
      }
      var imageTags = ""
      buildFileTags(image.src, display).forEach(value => {
        if(value.tag == "source") {
          imageTags += `<source data-srcset="${value.srcSet}" type="image/${value.sub_type}" />`

        } else {
          imageTags += `<img alt="${alt}" style="width: 100%; height: 100%" class="lazyload" data-srcset="${value.srcSet}" data-src="${getSrc(image.src, display.default)}" />`
        }
       
      })
      children += `
      <div style="
        width: ${image.autoWidth? "auto" : image.width + image.widthType};
        height: ${image.autoHeight? "auto" : image.height + image.heightType};
        padding-right: ${gridItemsSpacing + "px"};
        padding-bottom: ${gridItemsSpacing + "px"}
    " class="editor-image-container editor-grid-image-output">
        <picture style="width: 100%; height: 100%">
          ${imageTags}
          <div style="position: relative"></div>
        </picture>
    </div>`
    })
    return `<div style="width: 100%; display: flex; justify-content: ${justify}">
      <div 
          style="display: flex; flex-wrap: wrap; width: ${entity.data.width || 100}%" class="editor-grid-image-output">
          ${
            children
          }
      </div>
    </div>`
  }
}