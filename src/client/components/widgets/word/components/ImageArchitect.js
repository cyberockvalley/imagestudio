import React from 'react'
import '../components/styles/image_selector.css'
import { getRowNeighbours } from '../../../../../algos'
import ResizableImage from './ResizableImage'

const $ = require('jquery')

export const DEFAULT_GRID_ITEMS_SPACING = 10

export const pixelToPercentage = (full, px) => {
    return Math.round((px / full) * 100)
}

export const percentageToPixel = (full, p) => {
    return Math.round((p * 100) / full)
}

export const getImagesContainerWidth = () => {
    return parseInt($(".resizables.images")[0].offsetWidth) + 0
}
export const getImagesContainerHeight = () => {
    return parseInt($(".resizables.images")[0].offsetHeight)
}

class ImageArchitect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            images: []
        }
    }

    componentDidMount() {
        const data = this.props.data
        this.setState(data)
        /*
        this.setState({
            images: this.props.images,
            submitHandler: this.props.submitHandler,
            gridItemsSpacing: this.props.gridItemsSpacing,
            alt: this.props.alt || ""
        })*/
    }

    onImageDrag = (ref, index) => {
        this.activeResizable = ref
    }

    onImageResize = (image, d) => {
        var containerWidth = getImagesContainerWidth()
        var containerHeight = getImagesContainerHeight()
        console.log("onImageResize", "d", d)
        console.log("onImageResize", "sizeBefore", image.state.width, image.state.height)
        if(d) {
            image.setState({
                width: image.state.width + (image.state.widthType == "%"? pixelToPercentage(containerWidth, d.width) : d.width),
                height: image.state.height + (image.state.heightType == "%"? pixelToPercentage(containerHeight, d.height) : d.height),
            })
        }
        console.log("onImageResize", "sizeAfter", image.state.width, image.state.height)

        var neigbours = getRowNeighbours(this.state.images.length, image.props.index, image.getWidth(), 
        (currentWidth, currentIndex) => {
            var newRowWidth = currentWidth + this.imageRefs[`image${currentIndex}`].getWidth()
            var maxRowWidth = image.state.widthType == "%"? 100 : getImagesContainerWidth() 
            console.log("onImageResize", "onWidth", currentWidth, newRowWidth, maxRowWidth)
            if(newRowWidth > maxRowWidth) return 0
            return newRowWidth
        })

        
        var newHeight = parseInt(image.state.height)

        console.log("onImageResize", neigbours)

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
        console.log("handleTextChange spacing1", this.state.gridItemsSpacing)
        console.log("handleTextChange spacing2", e.target.name, e.target.value)
        this.state[e.target.name] = e.target.value
        this.setState({[e.target.name]: e.target.value})
        console.log("handleTextChange spacing", this.state.gridItemsSpacing)
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
                alt: this.state.alt,
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
        if(!data || !data.images || data.images.length == 0 || !submitHandler) return
        return(
            <div id="image-achitect">
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
                <ImageEditBar {...this.props}
                    width={this.state.width}
                    onWidthChange={this.updateWidth}
                    onLeft={this.alignLeft}
                    onRight={this.alignRight}
                    onCenter={this.alignCenter}
                    moreHandler={this.configurationSettings} />
                <div className="images-container">
                    <div className="resizables images scroll-y">
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