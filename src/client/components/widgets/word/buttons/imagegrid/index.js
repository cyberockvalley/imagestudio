import React from 'react'
import PropTypes from 'prop-types';
import { Modifier, EditorState, AtomicBlockUtils } from 'draft-js';

import Option from '../../components/Option'

import ImageSelector from '../../components/ImageSelector';
import ImageArchitect, { DEFAULT_GRID_ITEMS_SPACING } from '../../components/ImageArchitect';
import WordProcessorSettings from '../../WordProcessorSettings';
import ModalView from '../../../ModalView';

const $ = require('jquery')

export const getImageSelectorProps = translations => {
  return {
    title: translations['components.controls.image.image_selector.title'],
    closeText: translations['components.controls.popups.close'],
    uploadTitle: translations['components.controls.image_selector.upload_file'],
    insertUrlTitle: translations['components.controls.image_selector.file_url'],
    mediaLibraryTitle: translations['components.controls.image_selector.media_library'],
    submitSingleButtonText: translations['components.controls.image.image_selector.submit_single'],
    submitMultipleButtonText: translations['components.controls.image.image_selector.submit_multiple'],
    insertUrlInputPlaceHolder: translations['components.controls.image.image_selector.insert_placeholder'],
    insertUrlSubmitText: translations['components.controls.image.image_selector.insert_submit'],
    loadingText: translations['components.controls.image.image_selector.loading_text'],
    insertUrlErrorMessage: translations['components.controls.image.image_selector.insert_url_error_message'],
    selectFilesText: translations['components.controls.image.image_selector.select_files_text'],
    dropFilesText: translations['components.controls.image.image_selector.drop_files_text'],
    uploadErrorMessage: translations['components.controls.image.image_selector.upload_error_message'],
  }
}

class ImageGrid extends React.Component {
    static PropTypes = {
      onChange: PropTypes.func,
      editorState: PropTypes.object,
      translations: PropTypes.object
    }

    constructor(props) {
      super(props)
      this.state = {
          openModal: false
      }
    }

    handleConfigurationChange = entityData => {
      console.log("handleConfigurationChange", entityData)
      const { editorState, onChange } = this.props;

      const entityKey = editorState
        .getCurrentContent()
        .createEntity(WordProcessorSettings.ToolBar.entities.imageGrid, 'MUTABLE', entityData)
        .getLastCreatedEntityKey();

      const newEditorState = AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        '.'
      )
      
      onChange(newEditorState);
    }

    handleModalClose = () => {
      this.setState({openModal: false, show_selector: false})
    }
  
    handleClick = () => {
     this.setState({openModal: true, show_selector: true})
    }

    handleImageSubmit = imageUrls => {
      console.log("ImageSubmit", imageUrls)
      var data = {
        width: 100,
        alignment: "center",
        gridItemsSpacing: DEFAULT_GRID_ITEMS_SPACING,
        alt: this.props.alt,
        images: this.preconfigureImages(imageUrls)
      }
      
      this.setState({
        data: data,
        show_selector: false
      })
    }

    preconfigureImages = urls => {
      var images = []
      urls.forEach(url => {
        images.push({
          src: url,
          width: 20, widthType: "%",
          height: 200, heightType: "px"
        })
      })
      return images
    }

    componentDidMount() {
    }
  
    render() {
      const { translations, icon, title, onMediaLibrary, onUpload } = this.props;
      return (
        <div
          className="rdw-image-wrapper"
          aria-label="rdw-image-control"
        >
          <Option
            value="unordered-list-item"
            title={title || translations['components.controls.imagegrid.title']}
            onClick={this.handleClick}
          >
            <img src={icon} alt="" />
          </Option>
          <ModalView
            open={this.state.openModal}
            onClose={this.handleModalClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={styles.image_widget_container}>
              {
                this.state.show_selector?
                <ImageSelector 
                  mediaLibraryHandler={onMediaLibrary}
                  uploadHandler={onUpload}
                  imageFromPageHandler={this.props.imageFromPageHandler}
                  submitHandler={this.handleImageSubmit}
                  closeHandler={this.handleModalClose}
                  {...getImageSelectorProps(translations)} />
                :
                <>
                {
                  this.state.data && this.state.data.images && this.state.data.images.length > 0?
                  <ImageArchitect
                    data={this.state.data}
                    submitHandler={this.handleConfigurationChange}
                    closeHandler={this.handleModalClose} /> : null
                }
                </>
              }
            </div>
          </ModalView>
        </div>
      )
    }
}

const styles = {
  image_widget_container: {
    background: "#fcfcfc",
    boxShadow: "0 5px 15px rgba(0,0,0,.7)",
    width: "95%",
    height: "95%",
    margin: "30px auto",
  }
}

export const imageModalContainerStyles = styles

export default ImageGrid