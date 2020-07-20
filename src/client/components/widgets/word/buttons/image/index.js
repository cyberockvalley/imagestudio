import React from 'react'
import PropTypes from 'prop-types';
import { Modifier, EditorState, AtomicBlockUtils } from 'draft-js';

import Option from '../../components/Option'

import Modal from '@material-ui/core/Modal'
import ImageSelector from '../../components/ImageSelector';
import ImageArchitect, { DEFAULT_GRID_ITEMS_SPACING } from '../../components/ImageArchitect';
import GridImageEntity from '../../entities/GridImageEntity';

const $ = require('jquery')

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
     this.setState({openModal: true})
    }

    handleConfigurationChange = entityData => {
      console.log("handleConfigurationChange", entityData)
      const { editorState, onChange } = this.props;

      const entityKey = editorState
        .getCurrentContent()
        .createEntity('GRID_IMAGE', 'MUTABLE', entityData)
        .getLastCreatedEntityKey();

      const newEditorState = AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        ' '
      )
      
      onChange(newEditorState);
    }

    handleModalClose = () => {
      this.setState({openModal: false})
    }

    handleImageSubmit = imageUrls => {
      console.log("ImageSubmit", imageUrls)
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
      var test_urls = [
        'https://imagestudio.com/wp-content/uploads/2020/02/o-Photos-1154.jpg',
        'https://imagestudio.com/wp-content/uploads/2019/10/o-Luxury-Wedding-Photographer.jpg',
        'https://imagestudio.com/wp-content/uploads/2020/02/o-Photos-1145.jpg',
        'https://imagestudio.com/wp-content/uploads/2019/07/o-E15A3338-2.jpg',
        'https://imagestudio.com/wp-content/uploads/2020/02/o-Photos-1317.jpg',
        'https://imagestudio.com/wp-content/uploads/2020/02/o-Photos-1095.jpg',
        'https://imagestudio.com/wp-content/uploads/2020/02/o-Photos-1299.jpg',
        'https://imagestudio.com/wp-content/uploads/2019/09/o-Site-Portfolio.jpg',
        'https://imagestudio.com/wp-content/uploads/2019/09/o-Photos-446.jpg',
        'https://imagestudio.com/wp-content/uploads/2020/02/o-Photos-1293.jpg',
        'https://imagestudio.com/wp-content/uploads/2019/09/o-photos111.jpg',
        'https://imagestudio.com/wp-content/uploads/2019/09/o-Photos-227.jpg',
        'https://imagestudio.com/wp-content/uploads/2019/07/o-1a.jpg',
        'https://imagestudio.com/wp-content/uploads/2020/02/o-Photos-1101-1.jpg',
        'https://imagestudio.com/wp-content/uploads/2020/02/o-Photos-1048.jpg',
        'https://imagestudio.com/wp-content/uploads/2020/02/o-Photos-654.jpg',
        'https://imagestudio.com/wp-content/uploads/2020/02/o-Photos-1189.jpg',
        'https://imagestudio.com/wp-content/uploads/2020/02/o-Photos-1112.jpg'
      ]
      this.setState({
        show_selector: false, 
        images: this.preconfigureImages(test_urls),
        gridItemsSpacing: DEFAULT_GRID_ITEMS_SPACING
      })
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
        insertUrlErrorMessage: translations['components.controls.image.image_selector.insert_url_error_message'],
        selectFilesText: translations['components.controls.image.image_selector.select_files_text'],
        dropFilesText: translations['components.controls.image.image_selector.drop_files_text'],
        uploadErrorMessage: translations['components.controls.image.image_selector.upload_error_message'],
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
            <div style={styles.image_widget_container}>
              {
                this.state.show_selector?
                <ImageSelector 
                  title={title}
                  translations={translations}
                  mediaLibraryHandler={onMediaLibrary}
                  uploadHandler={onUpload}
                  submitHandler={this.handleImageSubmit}
                  closeHandler={this.handleModalClose}
                  {...selectorProps} />
                :
                <>
                {
                  this.state.images?
                  <ImageArchitect
                    images={this.state.images}
                    submitHandler={this.handleConfigurationChange}
                    closeHandler={this.handleModalClose}
                    gridItemsSpacing={this.state.gridItemsSpacing}
                    alt={this.props.alt} /> : null
                }
                </>
              }
            </div>
          </Modal>
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

export default Image