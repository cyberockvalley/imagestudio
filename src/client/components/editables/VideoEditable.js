import React from 'react'
import ParseClient, { ParseClasses } from '../../../both/Parse';
import TextEditable from './TextEditable';
import FileChangerView from './FileChangerView';
import FileEditable from './FileEditable';

class VideoEditable extends FileEditable {
    constructor(props) {
        super(props)

        this.handleEditClick = this.handleEditClick.bind(this)
    }

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

    getOrCreateEditable(){
        if(this.Element) {
            return this.Element

        } else {
            var element = new ParseClasses.VideoElement()
            element.set("key", this.componentKey)
            element.set("tags", this.state.tags)
            element.set("editor", this.props.user)
            var ACL = this.guessACL()
            element.setACL(ACL)
            return element
        }
    }

    createFileData(file) {
        var fileData = new ParseClasses.VideoData()
        fileData.set("file", file)
        fileData.setACL(ACL)
        return fileData
    }

    getRelationName() {
        return "video_elements"
    }

    render() {
        this.init()
        console.log("VideoEditable", this.state)
        return(
            <div style={this.getStyle()}>
                <div style={styles.overlay}></div>
                <video style={this.props.edit && this.haveWritePermission()? videoHide : styles.video} playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
                    {
                        this.state.fileShades.map((videoData, index) => {
                            return(<source key={index} src={videoData.src} type={videoData.mime} />)
                        })
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