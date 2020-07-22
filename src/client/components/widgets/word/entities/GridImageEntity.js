import React from 'react'
import classNames from 'classnames';
import '../../../../res/css/react-draft.css'
import { EditorState } from 'draft-js';
import Modal from '@material-ui/core/Modal'
import ImageSelector from '../components/ImageSelector';
import ImageArchitect from '../components/ImageArchitect';
import { getImageSelectorProps, imageModalContainerStyles } from '../buttons/image';
import ImageEditBar from '../components/ImageEditBar';

export const gridImageStrategy = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(character => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === 'GRID_IMAGE'
        );
    }, callback)
}

class GridImageEntity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        const data = this.getData()
        this.setState({
            entityData: data.entityData
        })
    }

    toggleHovered = () => {
        this.setState({
            hovered: !this.state.hovered,
        })
    }

    onEdit = () => {

    }

    update = updates => {
        const data = this.getData()
        data.contentState.mergeEntityData(data.entityKey, updates)
        data.config.onChange(EditorState.push(data.config.getEditorState(), data.contentState, 'change-block-data'))
        this.setState({
            entityData: {...this.state.entityData, updates},
        })
    }

    alignLeft = () => {
        this.update({ alignment: 'left' })
    }

    alignRight = () => {
        this.update({ alignment: 'right' })
    }

    alignCenter = () => {
        this.update({ alignment: 'center' })
    }

    updateWidth = newWidth => {
        this.update({ width: newWidth })
    }

    handleModalClose = () => {
        this.getData().config.updateReadOnly(false)
        this.setState({openModal: false})
    }

    toggleModal = openData => {
        this.setState({
            ...{openModal: true, show_selector: false, show_architect: false},
            ...openData,
        })
        this.getData().config.updateReadOnly(true)
    }

    configurationSettings = () => {
        this.toggleModal({show_architect: true})
    }

    handleImageAdd = entityData => {
        this.getData().config.updateReadOnly(false)
        this.state.show_architect = true
        this.state.show_selector = true
        this.state.openModal = true
        this.setState({entityData: entityData, show_architect: true, show_selector: true})
        this.getData().config.updateReadOnly(true)
        console.log("ImageAdd", this.state.show_selector, this.state.show_architect, this.state.openModal)
    }

    handleImageSubmit = images => {
        var entityData = this.state.entityData
        entityData.images = entityData.images.concat(images)
        this.setState({
            entityData: entityData
        })
        this.configurationSettings()
    }

    handleConfigurationChange = entityData => {
        console.log("configChange", entityData)
        this.handleModalClose()
        this.update(entityData)
    }

    getData = () => {
        const { entityKey, contentState, config } = this.props; 
        console.log("GIM", config)
        console.log("GIM", 2, this.props)

        return {
            entityKey: entityKey,
            entityData: contentState.getEntity(entityKey).getData(),
            contentState: contentState,
            config: config
        }
    }

    render() {
        const data = this.getData()
        const { 
            gridItemsSpacing,
            alignment,
            width,
            alt,
            images
        } = data.entityData
        const {
            translations,
            onMediaLibrary,
            onUpload
        } = data.config
        const {
            show_selector, show_architect
        } = this.state
        return <>
                    <div
                        onMouseEnter={this.toggleHovered}
                        onMouseLeave={this.toggleHovered}
                        className={classNames(
                        'rdw-image-alignment',
                        {
                            'rdw-image-left': alignment === 'left',
                            'rdw-image-right': alignment === 'right',
                            'rdw-image-center': alignment === 'center' || !alignment || alignment === 'none',
                        },
                        )}
                        style={{ width: "100%" }}
                    >
                        <div 
                        style={{width: "100%", display: "flex", flexWrap: "wrap", width: `${width || 100}%`}}>
                            {
                                images.map((image, index) => (
                                    <div key={index} style={{
                                        width: image.width + image.widthType,
                                        height: image.height + image.heightType,
                                        paddingRight: gridItemsSpacing + "px",
                                        paddingBottom: gridItemsSpacing + "px"
                                    }}>
                                        <img src={image.src} alt={alt} style={{width: "100%", height: "100%"}} />
                                    </div>
                                ))
                            }
                        </div>
                        {
                            this.state.hovered?
                            <>
                                <ImageEditBar {...this.props} top 
                                width={width}
                                onWidthChange={this.updateWidth}
                                onLeft={this.alignLeft}
                                onRight={this.alignRight}
                                onCenter={this.alignCenter}
                                moreHandler={this.configurationSettings} />
                                <ImageEditBar {...this.props} bottom 
                                width={width}
                                onWidthChange={this.updateWidth}
                                onLeft={this.alignLeft}
                                onRight={this.alignRight}
                                onCenter={this.alignCenter}
                                moreHandler={this.configurationSettings} />
                            </>: null
                        }
                    </div>
                    <Modal
                        open={this.state.openModal}
                        onClose={this.handleModalClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <div style={imageModalContainerStyles.image_widget_container}>
                        {
                            show_selector?
                            <ImageSelector 
                            mediaLibraryHandler={onMediaLibrary}
                            uploadHandler={onUpload}
                            submitHandler={this.handleImageSubmit}
                            closeHandler={this.handleModalClose}
                            {...getImageSelectorProps(translations)} />
                            :
                            <>
                            {
                            show_architect?
                            <ImageArchitect
                                data={data.entityData}
                                submitHandler={this.handleConfigurationChange}
                                closeHandler={this.handleModalClose}
                                addHandler={null}
                                alt={alt} /> : null
                            }
                            </>
                        }
                        </div>
                    </Modal>
                </>
    }
}

const EDIT_WIDTH = 50
const EDIT_HEIGHT = 50
const styles = {
    hover: {
        position: "fixed",
        width: EDIT_WIDTH,
        height: EDIT_HEIGHT,
        padding: "5px",
        background: "#000",
        opacity: 0.8,
        color: "#bcbcbc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "3px"
    }
}

export default GridImageEntity