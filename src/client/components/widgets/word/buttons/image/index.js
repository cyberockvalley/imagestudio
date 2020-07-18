import React from 'react'
import PropTypes from 'prop-types';
import { Modifier, EditorState } from 'draft-js';

import Option from '../../components/Option'

import Modal from '@material-ui/core/Modal'
import ImageSelector from '../../components/ImageSelector';

class Image extends React.Component {
    static PropTypes = {
      onChange: PropTypes.func,
      editorState: PropTypes.object,
      translations: PropTypes.object
    }

    constructor(props) {
      super(props)
      this.state = {
          openModal: true
      }
    }
  
    handleClick = () => {
      const { editorState, onChange } = this.props;
      /*
      const contentState = Modifier.replaceText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        '<div>ss</div>',
        editorState.getCurrentInlineStyle(),
      );
      onChange(EditorState.push(editorState, contentState, 'insert-characters'));
      */
     this.setState({openModal: true})
    }

    handleModalClose = () => {
      this.setState({openModal: false})
    }

    handleImageSubmit = imageUrls => {

    }
  
    render() {
      const { translations, icon, title, onMediaLibrary, onUpload } = this.props;
      const selectorProps = {
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
        insertUrlErrorMessage: translations['components.controls.image.image_selector.insert_url_error_message']
      }
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
          <Modal
            open={this.state.openModal}
            onClose={this.handleModalClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={styles.image_selection_container}>
              <ImageSelector 
                title={title}
                translations={translations}
                onMediaLibrary={onMediaLibrary}
                onUpload={onUpload}
                submitHandler={this.handleImageSubmit}
                closeHandler={this.handleModalClose}
                {...selectorProps} />
            </div>
          </Modal>
        </div>
      )
    }
}

const styles = {
  image_selection_container: {
    background: "#fcfcfc",
    margin: "30px",
    boxShadow: "0 5px 15px rgba(0,0,0,.7)"
  }
}

export default Image