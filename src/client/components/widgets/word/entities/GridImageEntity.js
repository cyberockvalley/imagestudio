import React from 'react'
import classNames from 'classnames';
import '../../../../../static/css/react-draft.min.css'
import { EditorState } from 'draft-js';
import ImageSelector from '../components/ImageSelector';
import ImageArchitect from '../components/ImageArchitect';
import { getImageSelectorProps, imageModalContainerStyles } from '../buttons/imagegrid';
import ImageEditBar from '../components/ImageEditBar';
import WordProcessorSettings from '../WordProcessorSettings';
import ModalView from '../../ModalView';
import { buildFileTags, getSrc } from '../../../editables/utils/imagefunc';
import { IMAGE_PICTURE_SOURCE_EXTENSIONS, IMAGE_PROCCESSORS } from '../../../../../both/Constants';
import { getSize } from './functions';

export const gridImageStrategy = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(character => {
        const entityKey = character.getEntity()
        return (
          entityKey !== null &&
          (
            contentState.getEntity(entityKey).getType() === WordProcessorSettings.ToolBar.entities.imageGrid || 
            contentState.getEntity(entityKey).getType() === WordProcessorSettings.ToolBar.entities.imageGrid2
          )
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
            entityData: {...this.state.entityData, ...updates},
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
        //console.log("ImageAdd", this.state.show_selector, this.state.show_architect, this.state.openModal)
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
        //console.log("configChange", entityData)
        this.handleModalClose()
        this.update(entityData)
    }

    getData = () => {
        const { entityKey, contentState, config } = this.props; 
        //console.log("GIM", config)
        //console.log("GIM", 2, this.props)

        return {
            entityKey: entityKey,
            entityData: contentState.getEntity(entityKey).getData(),
            contentState: contentState,
            config: config
        }
    }

    getImageDisplay = (image, containerWidth) => {
        const display = {
            image_exts: IMAGE_PICTURE_SOURCE_EXTENSIONS,
            default: {queries: `w=300`, proccessors: IMAGE_PROCCESSORS},
            manifests: [
              {at: 300, queries: `w=${getSize(300, containerWidth, entity.data.width, image.autoWidth, image.width, image.widthType)}`, proccessors: IMAGE_PROCCESSORS},
              {at: 576, queries: `w=${getSize(576, containerWidth, image.autoWidth, image.width, image.widthType)}`, proccessors: IMAGE_PROCCESSORS},
              {at: 768, queries: `w=${getSize(768, containerWidth, image.autoWidth, image.width, image.widthType)}`, proccessors: IMAGE_PROCCESSORS},
              {at: 992, queries: `w=${getSize(992, containerWidth, image.autoWidth, image.width, image.widthType)}`, proccessors: IMAGE_PROCCESSORS},
              {at: 1200, queries: `w=${getSize(1200, containerWidth, image.autoWidth, image.width, image.widthType)}`, proccessors: IMAGE_PROCCESSORS}
            ]
        }
        return display
    }

    render() {
        const data = this.getData()
        const { 
            gridItemsSpacing,
            alignment,
            alt,
            images
        } = data.entityData
        //console.log("Arc3", data.entityData)
        const {
            translations,
            onMediaLibrary,
            onUpload
        } = data.config
        const {
            show_selector, show_architect
        } = this.state
        const {width} = this.state.entityData || {width: 100}
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
                        style={{display: "flex", flexWrap: "wrap", width: `${width || 100}%`}} className="editor-grid-image-output">
                            {
                                images.map((image, index) => (
                                    <div key={index} style={{
                                        width: image.autoWidth? "auto" : image.width + image.widthType,
                                        height: image.autoHeight? "auto" : image.height + image.heightType,
                                        paddingRight: gridItemsSpacing + "px",
                                        paddingBottom: gridItemsSpacing + "px"
                                    }} className="editor-grid-image-output">
                                        <picture style={{width: "100%", height: "100%"}}>
                                        {
                                            buildFileTags(image.src, this.getImageDisplay(image, width)).map((value, index) => {
                                                return value.tag == "source"? 
                                                <source key={index} data-srcset={value.srcSet} />
                                                :
                                                <img alt={alt} className="lazyload" key={index} data-srcset={value.srcSet} data-src={getSrc(image.src, this.getImageDisplay(image).default)} style={{width: "100%", height: "100%"}} />
                                            })
                                        }
                                        <div style={{position: "relative"}}></div>
                                        </picture>
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
                    <ModalView
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
                    </ModalView>
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