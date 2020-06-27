import React from 'react'
import ParseClient, { ParseClasses } from '../../../both/Parse';
import TextEditable from './TextEditable';
import FileChangerView from './FileChangerView';
import FileEditable from './FileEditable';

class VideoEditable extends FileEditable {
    constructor(props) {
        super(props)

        this.handleEditClick = this.handleEditClick.bind(this)

        this.state = {
            successMessage: this.successMessage,
            errorMessage: this.errorMessage
        }
    }

    newMesage = this.props.emptyUploadMessage? this.props.newUploadMessage : "Please upload a video"
    editMessage = this.props.changeUploadMessage? this.props.changeUploadMessage : "Want to change this video?"
    successMessage = this.props.successMessage? this.props.successMessage : "Upload successfull"
    errorMessage = this.props.errorMessage? this.props.errorMessage : "An error occurred while uploading your video :("

    getMessage = () => {
        return this.Element? this.newMesage : this.editMessage
    }
    
    style = {
        width: this.props.width? this.props.width : "100%",
        height: this.props.height? this.props.height : "100%"
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
        this.props.refSetter(this)
        this.ElementClass = ParseClasses.VideoElement
        this.FileDataClass = ParseClasses.VideoData
    }

    handleEditClick = e => {
        e.preventDefault()
    }

    cancelEdit = () => {
        console.log("cancelEdit", this.componentKey, this.state)
        this.setState({
            data: "",
            tags: ""
        })
    }

    //https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4
    getVideo = () => {
        if(this.Element && this.haveReadPermission()) {
            return this.Element.get("data").map(index, videoData => {
                <source src={this.getGetFileDataSRC(videoData)} type={this.getGetFileDataMime(videoData)} />
            })

        } else {
            return this.state.data? <img src={this.getGetFileDataSRC(this.state.data)} /> : <></>
        }
    }

    render() {
        this.init()
        return(
            <div style={this.getStyle()}>
                <div style={styles.overlay}></div>
                <video style={this.props.edit && this.haveWritePermission()? videoHide : styles.video} playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
                    {
                        this.getVideo()
                    }
                </video>
                
                {
                   this.props.title || this.props.description || this.props.centerElement?
                    <div class="container h-100 w-100" style={styles.container}>
                        <div class="d-flex h-100 w-100 text-center align-items-center">
                            {
                                 this.props.showInfo && this.props.textEditableProps?
                                 <div class="w-100 text-white">
                                    {
                                        this.props.title?
                                        <h1 class="display-3">
                                            <TextEditable 
                                                name={this.props.title}
                                                {...this.props.textEditableProps} height={100} is_input_text/>
                                        </h1>
                                        :<></>
                                    }
                                    {
                                        this.props.description?
                                        <p class="lead mb-0">
                                            <TextEditable 
                                                name={this.props.description}
                                                {...this.props.textEditableProps} height={56} is_input_text/>
                                        </p>
                                        :<></>
                                    }
                                </div>
                                :<></>
                            }
                            {
                                this.props.centerElement?
                                <div style={{
                                    position: "absolute", 
                                    width: "100%", 
                                    height: "100%", 
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    zIndex: 5
                                }}>
                                    {this.props.centerElement}
                                </div>
                                :<></>
                            }
                        </div>
                    </div>
                    :<></>
                }
                {   //the file change element
                    this.props.edit && this.haveWritePermission()?
                    <FileChangerView 
                        type="video"
                        message={this.getMessage()}
                        error={this.state.errorMessage}
                        success={this.state.successMessage}
                        loading={this.state.loadingMessage}
                        onFile={this.handleFile} />
                    :<></>
                }
            </div>
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
    video: {
        position: "absolute",
        top: "50%",
        left: "50%",
        minWidth: "100%",
        minHeight: "100%",
        width: "auto",
        height: "auto",
        zIndex: "0",
        msTransform: "translateX(-50%) translateY(-50%)",
        mozTransform: "translateX(-50%) translateY(-50%)",
        webkitTransform: "translateX(-50%) translateY(-50%)",
        transform: "translateX(-50%) translateY(-50%)",
    }
      
}

const videoHide = {
    ...styles.video,
    display: "none"
}

export default VideoEditable