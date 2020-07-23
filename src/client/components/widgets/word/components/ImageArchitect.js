import React from 'react'
import '../components/styles/image_selector.css'
import { getRowNeighbours } from '../../../../../algos'
import ResizableImage from './ResizableImage'
import ImageEditBar from './ImageEditBar'
import classNames from 'classnames';
import { roundTo } from '../../../../../both/Functions'

const $ = require('jquery')

export const DEFAULT_GRID_ITEMS_SPACING = 10

export const pixelToPercentage = (full, px) => {
    var result = (px / full) * 100
    //if((result + "").includes(".")) result = roundTo(result, 2)
    return Math.round(result)
}

export const percentageToPixel = (full, p) => {
    var result = (p * 100) / full
    //if((result + "").includes(".")) result = roundTo(result, 2)
    return Math.round(result)
}

export const getImagesContainerWidth = () => {
    return $("#architect-images").innerWidth + 15
}
export const getImagesContainerHeight = () => {
    return $("#architect-images").innerHeight
}

class ImageArchitect extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        image: []
    }

    componentDidMount() {
        const data = this.props.data
        this.setState(data)
    }

    onImageDrag = (ref, index) => {
        this.activeResizable = ref
    }

    onImageResize = (image, d) => {
        var containerWidth = getImagesContainerWidth()
        var containerHeight = getImagesContainerHeight()
        if(d) {
            image.setState({
                width: image.state.width + (image.state.widthType == "%"? pixelToPercentage(containerWidth, d.width) : d.width),
                height: image.state.height + (image.state.heightType == "%"? pixelToPercentage(containerHeight, d.height) : d.height),
            })
        }

        var neigbours = getRowNeighbours(this.state.images.length, image.props.index, image.getWidth(), 
        (currentWidth, currentIndex) => {
            var newRowWidth = currentWidth + this.imageRefs[`image${currentIndex}`].getWidth()
            var maxRowWidth = image.state.widthType == "%"? 99 : getImagesContainerWidth() 
            console.log("onImageResize", "currentW", currentWidth, "imageWidth", this.imageRefs[`image${currentIndex}`].getWidth(), "newW", newRowWidth)
            if(newRowWidth > maxRowWidth) return 0
            return newRowWidth
        })

        
        var newHeight = parseInt(image.state.height)

        neigbours.forEach(imageIndex => {
            var image = this.imageRefs[`image${imageIndex}`]
            image.setState({
                height: newHeight,
            })
        })
    }

    imageRefs = {}
    setRef = (ref, index) => {
        this.imageRefs[`image${index}`] = ref
    }

    handleTextChange = e => {
        this.state[e.target.name] = e.target.value
        this.setState({[e.target.name]: e.target.value})
    }

    getConfig = () => {
        var states = []
        for(var i = 0; i < this.state.images.length; i++) {
            var image = this.imageRefs[`image${i}`]
            states.push({
                width: image.state.width,
                height: image.state.height,
                widthType: image.state.widthType,
                heightType: image.state.heightType,
                autoWidth: image.state.autoWidth,
                autoHeight: image.state.autoHeight,
                src: image.props.src
            })
        }
        return {
            alignment: this.state.alignment,
            width: this.state.width,
            gridItemsSpacing: this.state.gridItemsSpacing,
            alt: this.state.alt,
            images: states
        }
    }

    handleSubmit = () => {
        this.props.submitHandler(this.getConfig())
        $("#close").click()
    }

    addImage = () => {
        this.props.addHandler(this.getConfig())
        $("#close").click()
    }

    alignLeft = () => {
        this.setState({alignment: "left"})
    }

    alignCenter = () => {
        this.setState({alignment: "center"})
    }

    alignRight = () => {
        this.setState({alignment: "right"})

    }

    updateWidth = newWidth => {
        this.setState({width: newWidth})
    }

    render() {
        const {
            singleImageTitle,
            multipleImageTitle,
            closeText,
            closeHandler,
            data,
            submitHandler,
            marginText,
            submitSingleButtonText,
            submitMultipleButtonText,
            altText
        } = this.props
        const {alignment, width} = this.state
        if(!this.state || !this.state.images || this.state.images.length == 0 || !submitHandler) return null
        return(
            <div id="image-architect">
                <div style={styles.header}>
                    <div>
                        <h1 style={styles.title}>
                            {
                                data.images.length == 1?
                                singleImageTitle || "Configure Image"
                                :
                                multipleImageTitle || "Configure Images"
                            }
                        </h1>
                    </div>
                    <div className="edit-bar-group-item">
                        <button 
                            type="button" className="btn btn-primary d-inline" style={{margin: "0px 10px"}} 
                            onClick={this.handleSubmit}>
                            {
                                this.state.images == 1?
                                submitSingleButtonText || "Insert Image"
                                :
                                submitMultipleButtonText || "Insert Images"
                            }
                        </button>
                        {
                            closeHandler?
                            <button id="close" onClick={closeHandler} type="button" className="media-modal-close">
                                <span className="close fa fa-times">
                                    <span className="screen-reader-text">
                                        {
                                            closeText || "Close Dialog"
                                        }
                                    </span>
                                </span>
                            </button> 
                            : null
                        }
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center", padding: "0px 10px"}}>
                    <div className="form-group" style={{margin: "0px 10px  0px 0px"}}>
                        <label for="grid-items-spacing" className="col-form-label d-inline" style={{marginRight: "5px"}}>
                            {
                                marginText || "Margin:"
                            }
                        </label>
                        <input id="grid-items-spacing" name="gridItemsSpacing" onChange={this.handleTextChange} className="form-control d-inline" style={{width: "100px"}} type="number" value={this.state.gridItemsSpacing} />
                    </div>
                    <div className="form-group" style={{margin: "0px 10px  0px 0px"}}>
                        <label for="alt" className="col-form-label d-inline" style={{marginRight: "5px"}}>
                            {
                                `${altText || "Desciption"}(alt):`
                            }
                        </label>
                        <input id="alt" name="alt" onChange={this.handleTextChange} className="form-control d-inline" style={{width: "200px"}} type="text" value={this.state.alt} />
                    </div>
                    {
                        this.props.addHandler?
                        <button 
                            type="button" className="btn btn-secondary fa fa-plus" style={{margin: "0px 10px  0px 0px"}} 
                            onClick={this.addImage}>
                        </button>
                        : null
                    }
                </div>
                <ImageEditBar
                    width={width}
                    onWidthChange={this.updateWidth}
                    onLeft={this.alignLeft}
                    onRight={this.alignRight}
                    onCenter={this.alignCenter}
                    style={{
                        position: "relative",
                        width: "100%",
                        margin: "5px auto"
                    }} />
                <div className="images-container" 
                    className={classNames(
                        'rdw-image-alignment',
                        {
                            'rdw-image-left': alignment === 'left',
                            'rdw-image-right': alignment === 'right',
                            'rdw-image-center': alignment === 'center' || !alignment || alignment === 'none',
                        },
                        )}
                    style={{ width: "100%" }}>
                    <div id="architect-images" className="modal-scroll-y" 
                    style={{width: `${width || 100}%`}}>
                        {
                            this.state.images.map((image, index) => {
                                return <ResizableImage 
                                key={index} {...image} 
                                index={index}
                                space={this.state.gridItemsSpacing}
                                onResize={this.onImageResize}
                                onDrag={this.onImageDrag}
                                refSetter={this.setRef} />
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
const styles = {
    title: {
        color: "#23282d",
        fontSize: "22px",
        fontWeight: 600,
        lineHeight: "2.27272727",
        margin: 0
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px"
    },
    draggedOver: {
        margin: 15,
        border: "1px dashed #5b9dd9"
    }
}


export default ImageArchitect