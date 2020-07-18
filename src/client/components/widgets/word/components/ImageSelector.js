import React from 'react'
import '../components/styles/image_selector.css'

const $ = require('jquery')

const DEFAULT_MIMES = "image/jpeg,image/png,image/gif,image/*"
const activaTab = (tab) => {
    $('.nav-tabs a[href="#' + tab + '"]')[0].click()
}
class Image extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.setState({loading: true})
        var that = this
        $("img.check_status")
        .one("load", () => { 
            that.setState({loading: false})
            if(that.props.onload)  that.props.onload()

        })
        .one('error', () => {
            that.setState({loading: false})
            if(that.props.onerror) that.props.onerror()

        }).each(function() {
            if(this.complete) {
                $(this).trigger('load')
            }
        })
    }

    render() {
        return (
            <div className="image-selectior-image-item">
                <img src={this.props.src} class="check_status" />
                {
                    this.state.loading?
                    <div class="spinner-border text-danger"></div> : null
                }
            </div>
            
        )
    }

}

class ImageSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            upload_images: [],
            url_images: [],
            library_images: [],

            selected_upload_images: [],
            selected_url_images: [],
            selected_library_images: []
        }

        this.handleTextChange = this.handleTextChange.bind(this)
    }

    handleUrlSubmit = () => {
        if(this.state.insert_url) {
            this.setState({url_loading: true})
            var urlImages = this.state.url_images
            urlImages.push({
                url: this.state.insert_url,
                justAdded: true
            })
            this.setState({
                url_images: urlImages, 
                insert_url_has_error: false
            })
        }
    }

    handleTextChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    componentDidMount() {
        this.setState({accept: this.props.accept || DEFAULT_MIMES})
        var that = this
        console.log("ImageSelector", $("#image-selector"))
        $("#image-selector").on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
          })
          .on('dragover dragenter', function() {
            activaTab("nav-upload")
            that.setState({draggedOver: true})
          })
          .on('dragleave dragend drop', function() {
            that.setState({draggedOver: false})
          })
          .on('drop', function(e) {
            that.uploadFiles(e.originalEvent.dataTransfer.files)
        })
    }

    uploadFiles = files => {
        this.setState({uploading: true, upload_error: ""})
        this.props.uploadHandler(files)
        .then(response => {
            this.setState({uploading: false, upload_images: response.data.list.concat(this.state.upload_images)})
        })
        .catch(() => {
            this.setState({uploading: false, upload_error: this.props.uploadErrorMessage || "Upload Failed!"})
        })
    }

    handleFileChange = e => {
        this.uploadFiles(e.target.files)
    }

    render() {
        const {  
            mediaLibraryHandler,
            uploadHandler,
            submitHandler,
            closeHandler, 
            title, 
            closeText,
            uploadTitle,
            insertUrlTitle,
            mediaLibraryTitle,
            submitSingleButtonText,
            submitMultipleButtonText,
            insertUrlInputPlaceHolder,
            insertUrlSubmitText,
            loadingText,
            insertUrlErrorMessage,
            selectFilesText,
            dropFilesText
        } = this.props
        if(!submitHandler) return null
        return(
            <div id="image-selector">
                <div style={styles.header}>
                    <div>
                        <h1 style={styles.title}>
                            {
                                title || "Add"
                            }
                        </h1>
                    </div>
                    {
                        closeHandler?
                        <button onClick={closeHandler} type="button" className="media-modal-close">
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
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        {
                            !uploadHandler? null :
                            <a className="nav-item nav-link active" id="nav-upload-tab" data-toggle="tab" href="#nav-upload" role="tab" aria-controls="nav-upload" aria-selected="true">
                                {
                                    uploadTitle || "Upload Files"
                                }
                            </a>
                        }
                        <a className="nav-item nav-link" id="nav-url-tab" data-toggle="tab" href="#nav-url" role="tab" aria-controls="nav-url" aria-selected="false">
                            {
                                insertUrlTitle || "Insert From URL"
                            }
                        </a>
                        {
                            !mediaLibraryHandler? null :
                            <a className="nav-item nav-link" id="nav-media-library-tab" data-toggle="tab" href="#nav-media-library" role="tab" aria-controls="nav-media-library" aria-selected="false">
                                {
                                    mediaLibraryTitle || "Media Library"
                                }
                            </a>
                        }
                    </div>
                </nav>
                <div className="tab-content image-selector-body" id="nav-tabContent" 
                style={this.state.draggedOver? styles.draggedOver : {}}>
                    {
                        !uploadHandler? null :
                        <div className="tab-pane fade show active" id="nav-upload" role="tabpanel" aria-labelledby="nav-upload-tab">
                            {
                                this.state.uploading?
                                <div class="spinner-border text-info"></div>
                                :
                                <>
                                    <label className="action" for="file">
                                        <input onChange={this.handleFileChange} id="file" name="file" type="file" style={{display: "none"}} accept={this.state.accept} multiple />
                                        <span className="btn btn-large btn-outline-primary d-inline">
                                            { selectFilesText || "Select Files" }
                                        </span>
                                    </label> <b>/</b> <h6 className="d-inline">{ dropFilesText || "Drop Files" }</h6>
                                </>
                            }
                            {
                                this.state.upload_error && this.state.upload_error.length > 0?
                                <div class="invalid-feedback d-block">{this.state.upload_error}</div> : null
                            }

                            <div className="row images">
                            {
                                this.state.upload_images.map((url, index) => {
                                    return <Image key={index} src={url} 
                                        onload={() => {
                                            var urlImagesSelected = this.state.selected_upload_images
                                            urlImagesSelected.push(url)
                                            this.setState({
                                                selected_upload_images: urlImagesSelected
                                            })
                                        }}
                                        onerror={(e) => {
                                            var images = this.state.upload_images
                                            images.splice(index, 1)
                                            this.setState({
                                                upload_images: images
                                            })
                                        }} />
                                })
                            }
                            </div>

                        </div>
                    }
                    <div className="tab-pane fade" id="nav-url" role="tabpanel" aria-labelledby="nav-url-tab">
                        <div className={`form-group`}>
                            <div className={
                                `input-group ${this.state.url_loading? "form-image-right" : ""}`}
                            >
                                <input type="text" className={`form-control form-control-lg ${this.state.insert_url_has_error? "is-invalid" : ""}`} 
                                placeholder={insertUrlInputPlaceHolder}
                                name="insert_url"
                                value={this.state.insert_url}
                                onChange={this.handleTextChange}/>
                                {
                                    this.state.url_loading?
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <div className="spinner-grow text-info">
                                                <span class="sr-only">{loadingText || "Loading..."}</span>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="input-group-append" onClick={this.handleUrlSubmit} style={{cursor: "pointer"}}>
                                        <div className="input-group-text">
                                            <span>{insertUrlSubmitText || "Get Image"}</span>
                                        </div>
                                    </div>
                                }
                            </div>
                            {
                                this.state.insert_url_has_error?
                                <div class="invalid-feedback d-block">
                                {
                                    insertUrlErrorMessage || "File retrieval failed. Check the url or your internet connection."
                                }
                                </div>
                                : null
                            }
                        </div>
                        
                        <div className="row images">
                            {
                                this.state.url_images.map((image, index) => {
                                    return  <Image key={index} src={image.url} 
                                        onload={() => {
                                            if(image.justAdded) {
                                                var urlImagesSelected = this.state.selected_url_images
                                                urlImagesSelected.push(image.url)
                                                this.setState({
                                                    url_loading: false,
                                                    insert_url: "",
                                                    selected_url_images: urlImagesSelected
                                                })
                                                image.justAdded = false
                                            }
                                        }}
                                        onerror={(e) => {
                                            var images = this.state.url_images
                                            images.splice(index, 1)
                                            this.setState({
                                                url_images: images,
                                                url_loading: false,
                                                insert_url: "",
                                                insert_url_has_error: true
                                            })
                                        }} />
                                })
                            }
                        </div>
                    </div>
                    {
                        !mediaLibraryHandler? null :
                        <div className="tab-pane fade" id="nav-media-library" role="tabpanel" aria-labelledby="nav-media-library-tab">

                        </div>
                    }
                </div>
                <div className="modal-footer image-selector-footer">
                    {
                        this.state.selected_upload_images.length > 0 || this.state.selected_url_images.length > 0 || this.state.selected_library_images.length > 0?
                        <button 
                            type="button" className="btn btn-primary" 
                            onClick={submitHandler}>
                            {
                                this.state.selected_upload_images.length + this.state.selected_url_images.length + this.state.selected_library_images.length == 1?
                                submitSingleButtonText || "Submit File"
                                :
                                submitMultipleButtonText || "Submit Files"
                            }
                        </button>
                        : null
                    }
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

export default ImageSelector