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
    
    handleClick = () => {
        if(this.props.clickHandler) {
            this.props.clickHandler(!this.props.selected)
        }
    }

    render() {
        return (
            <div className={`image-selector-image-item ${this.props.selected? "selected" : ""}`}>
                <img onClick={this.handleClick} src={this.props.src} class="check_status action" />
                {
                    this.state.loading?
                    <div class="spinner-border text-danger"></div> : null
                }
                <div onClick={this.handleClick} className="checkbox action">
                    <span className={`fa fa-check ${this.props.selected? "active" : ""}`}></span>
                    <span className={`fa fa-minus ${this.props.selected? "" : "active"}`}></span>
                </div>
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
                justAdded: true,
                url_loading: false
            })
            this.setState({
                url_images: urlImages, 
                insert_url_has_error: false,
                url_loading: false
            })
        }
    }

    handlePageUrlSubmit = () => {
        if(this.state.insert_url) {
            this.setState({url_loading: true})
            var urlImages = this.state.url_images

            this.props.imageFromPageHandler(this.state.insert_url)
            .then(response => {
                var urls = response.data.list
                urls.forEach(url => {
                    urlImages.push({
                        url: url,
                        justAdded: true
                    })
                })
                this.setState({
                    url_images: urlImages, 
                    insert_url_has_error: false,
                    url_loading: false
                })
            })
            .catch(e => {
                //console.log("getImageFromPage", "error2", e)
                this.setState({ 
                    insert_url_has_error: true,
                    url_loading: false
                })
            })
            
        }
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

    handleTextChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    componentDidMount() {
        this.setState({accept: this.props.accept || DEFAULT_MIMES})
        var that = this
        //console.log("ImageSelector", $("#image-selector"))
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

    handleFileChange = e => {
        this.uploadFiles(e.target.files)
    }

    handleFilesSubmit = () => {
        var urls = this.state.selected_upload_images.
        concat(this.state.selected_url_images)
        .concat(this.state.selected_library_images)
        this.props.submitHandler(urls)
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
                    <div className="edit-bar-group-item">
                        {
                            this.state.selected_upload_images.length > 0 || this.state.selected_url_images.length > 0 || this.state.selected_library_images.length > 0?
                            <button 
                                type="button" className="btn btn-primary d-inline" style={{margin: "0px 10px"}} 
                                onClick={this.handleFilesSubmit}>
                                {
                                    this.state.selected_upload_images.length + this.state.selected_url_images.length + this.state.selected_library_images.length == 1?
                                    submitSingleButtonText || "Submit File"
                                    :
                                    submitMultipleButtonText || "Submit Files"
                                }
                            </button>
                            : null
                        }
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

                            <div className="row modal-scroll-y">
                            {
                                this.state.upload_images.map((url, index) => {
                                    return <Image key={index} src={url} 
                                        onload={() => {
                                            if(!this.state.selected_upload_images.includes(url)) {
                                                var urlImagesSelected = this.state.selected_upload_images
                                                urlImagesSelected.push(url)
                                                this.setState({
                                                    selected_upload_images: urlImagesSelected
                                                })
                                            }
                                        }}
                                        onerror={() => {
                                            var images = this.state.upload_images
                                            images.splice(index, 1)
                                            this.setState({
                                                upload_images: images
                                            })
                                        }}
                                        selected={this.state.selected_upload_images.includes(url)}
                                        clickHandler={select => {
                                            var images = this.state.selected_upload_images
                                            if(select) {
                                                //console.log("CheckTest", "BeforeInsert", "fileUpload", this.state.selected_upload_images)
                                                images.push(url)
                                                this.setState({selected_upload_images: images})
                                                //console.log("CheckTest", "AfterInsert", "fileUpload", this.state.selected_upload_images)

                                            } else {
                                                //console.log("CheckTest", "BeforeRemove", "fileUpload", this.state.selected_upload_images)
                                                var index = images.indexOf(url)
                                                images.splice(index, 1)
                                                this.setState({selected_upload_images: images})
                                                //console.log("CheckTest", "AfterRemove", "fileUpload", this.state.selected_upload_images)
                                            }
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
                                    <div className="input-group-append" style={{cursor: "pointer"}}>
                                        {
                                            this.props.imageFromPageHandler?
                                            <div class="dropdown">
                                                <button class="btn btn-secondary btn-lg input-group-dropdown" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    {insertUrlSubmitText || "Get"}
                                                </button>
                                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a onClick={this.handleUrlSubmit} dataFrom="src" class="dropdown-item" href="#">Image</a>
                                                    <a onClick={this.handlePageUrlSubmit} dataFrom="page" class="dropdown-item" href="#">Images from page</a>
                                                </div>
                                            </div>
                                            :
                                            <div onClick={this.handleUrlSubmit} className="input-group-text">
                                                <span>{insertUrlSubmitText || "Get Image"}</span>
                                            </div>
                                            
                                        }
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
                        
                        <div className="row modal-scroll-y">
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
                                        }}
                                        selected={this.state.selected_url_images.includes(image.url)}
                                        clickHandler={select => {
                                            var images = this.state.selected_url_images
                                            if(select) {
                                                //console.log("CheckTest", "BeforeInsert", "urlInsert", this.state.selected_url_images)
                                                images.push(image.url)
                                                this.setState({selected_url_images: images})
                                                //console.log("CheckTest", "AfterInsert", "urlInsert", this.state.selected_url_images)

                                            } else {
                                                //console.log("CheckTest", "BeforeRemove", "urlInsert", this.state.selected_url_images)
                                                var index = images.indexOf(image.url)
                                                images.splice(index, 1)
                                                this.setState({selected_url_images: images})
                                                //console.log("CheckTest", "AfterRemove", "urlInsert", this.state.selected_url_images)
                                            }
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