import React from 'react'
import ParseClient, { ParseClasses } from '../../../both/Parse';
import TextEditable from './TextEditable';
import FileChangerView from './FileChangerView';
import FileEditable from './FileEditable';

class ImageEditable extends FileEditable {
    constructor(props) {
        super(props)

        this.handleEditClick = this.handleEditClick.bind(this)
    }

    getMessage = () => {
        return this.Element? this.newMesage : this.editMessage
    }
    
    style = {
        width: this.props.width? this.props.width : "100%",
        height: this.props.height? this.props.height : "100%",
        position: "relative"
    }

    getStyle = () => {
        return this.props.style? {
            ...this.style,
            ...this.props.style
        } : this.style
    }

    handleEditClick = e => {
        e.preventDefault()
    }

    componentDidMount() {
        super.componentDidMount()
        if(this.props.refSetter) this.props.refSetter(this)
        this.ElementClass = ParseClasses.ImageElement
        this.FileDataClass = ParseClasses.ImageData
    }

    cancelEdit = () => {
        this.setState({
            data: "",
            tags: ""
        })
    }

    getOrCreateEditable(){
        if(this.Element) {
            return this.Element

        } else {
            var element = new ParseClasses.ImageElement()
            element.set("key", this.componentKey)
            element.set("tags", this.state.tags)
            element.set("editor", this.props.user)
            var ACL = this.guessedACL
            element.setACL(ACL)
            return element
        }
    }

    createFileData(file) {
        var fileData = new ParseClasses.ImageData()
        fileData.set("file", file)
        fileData.setACL(this.guessedACL)
        return fileData
    }

    getRelationName() {
        return "image_elements"
    }

    render() {
        this.init()
        console.log("UploadTracker", "ImageEditable", this.props.link, this.props.id)
        const style = this.getStyle()
        return (
            <FileChangerView
                key={this.props.key}
                className={this.props.className ? this.props.className : ""}
                id={this.props.id || this.componentKey}
                spinnerWidth={this.props.spinnerWidth}
                spinnerHeight={this.props.spinnerHeight}
                spinnerThickness={this.props.spinnerThickness}
                spinnerCircleColor={this.props.spinnerCircleColor}
                spinnerRunnerColor={this.props.spinnerRunnerColor}
                active={this.props.edit}
                type="image"
                loading={this.state.loading}
                error={this.state.error}
                onFile={this.handleFile}
                style={style}
                {...this.props.nativeProps}>

                {
                    this.props.add_overlay?
                    <div style={styles.overlay}></div> : <></>
                }
                <picture
                 key={this.state.fileShades && this.state.fileShades.length > 0? this.state.fileShades[0].src : 0} 
                 style={!this.haveReadPermission()? imageHide : styles.image}>
                    {
                        this.state.fileShades.map((imageData, index) => {
                            return(<img key={index} src={imageData.src} type={imageData.mime} 
                            style={this.props.style? this.props.style : {}} />)
                        })
                    }
                </picture>
                
                {
                this.props.title || this.props.description || this.props.centerElement?
                    <div className="container h-100 w-100" style={styles.container}>
                        <div className="d-flex h-100 w-100 text-center align-items-center">
                            {
                                this.props.showInfo && this.props.textEditableProps?
                                <div className="w-100 text-white">
                                    {
                                        this.props.title?
                                        <h1 className="display-3">
                                            <TextEditable 
                                                name={this.props.title}
                                                {...this.props.textEditableProps} height={this.props.title_height || 40} is_input_text/>
                                        </h1>
                                        :<></>
                                    }
                                    {
                                        this.props.description?
                                        <p className="lead mb-0">
                                            <TextEditable 
                                                name={this.props.description}
                                                {...this.props.textEditableProps} height={this.props.description_height || 40} is_input_text/>
                                        </p>
                                        :<></>
                                    }
                                </div>
                                :<></>
                            }
                            {
                                this.props.centerElement && !this.props.edit?
                                <div style={{
                                    position: "absolute", 
                                    width: "100%", 
                                    height: "100%", 
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    zIndex: 5000
                                }}>
                                    {this.props.centerElement}
                                </div>
                                :<></>
                            }
                        </div>
                    </div>
                    :<></>
                }
            </FileChangerView>
        )
    }
}

const styles = {
    container: {
        position: "relative",
        zIndex: 2,
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "black",
        opacity: "0.5",
        zIndex: 1,
    },
    image: {
        width: "100%",
        height: "auto",
        zIndex: "0"
    }
      
}

const imageHide = {
    ...styles.image,
    display: "none"
}

export default ImageEditable