import React from 'react'
import PropTypes from 'prop-types';
import { Modifier, EditorState } from 'draft-js';

import Option from '../../components/Option'

import Modal from '@material-ui/core/Modal'

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
  
    render() {
      const { translations, icon, title } = this.props;
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
            <div>
      
            </div>
          </Modal>
        </div>
      )
    }
}

export default ImageGrid