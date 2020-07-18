import React from 'react'
import '../components/styles/image_selector.css'

const jQuery = require("jquery")

class Image extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        var that = this
        jQuery("img.check_status").one("load", () => {
            if(that.props.onload)  that.props.onload()

          })
          .one('error', () => {
              if(this.props.onerror) this.props.onerror()

          }).each(function() {
            if(this.complete) {
                $(this).trigger('load')
            }
        })
    }

    render() {
        return (
            <img src={this.props.src} class="check_status" />
        )
    }

}

class ImageSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected_urls: [],
            url_images: []
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
            this.setState({url_images: urlImages, insert_url_has_error: false})
        }
    }

    handleTextChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {  
            closeHandler, 
            title, 
            closeText,
            uploadTitle,
            insertUrlTitle,
            mediaLibraryTitle,
            submitSingleButtonText,
            submitMultipleButtonText,
            submitHandler,
            insertUrlInputPlaceHolder,
            insertUrlSubmitText,
            loadingText,
            insertUrlErrorMessage
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
                        <a className="nav-item nav-link" id="nav-upload-tab" data-toggle="tab" href="#nav-upload" role="tab" aria-controls="nav-upload" aria-selected="true">
                            {
                                uploadTitle || "Upload Files"
                            }
                        </a>
                        <a className="nav-item nav-link active" id="nav-url-tab" data-toggle="tab" href="#nav-url" role="tab" aria-controls="nav-url" aria-selected="false">
                            {
                                insertUrlTitle || "Insert From URL"
                            }
                        </a>
                        <a className="nav-item nav-link" id="nav-media-library-tab" data-toggle="tab" href="#nav-media-library" role="tab" aria-controls="nav-media-library" aria-selected="false">
                            {
                                mediaLibraryTitle || "Media Library"
                            }
                        </a>
                    </div>
                </nav>
                <div className="tab-content image-selector-body" id="nav-tabContent">
                    <div className="tab-pane fade" id="nav-upload" role="tabpanel" aria-labelledby="nav-upload-tab">
A
                    </div>
                    <div className="tab-pane fade show active" id="nav-url" role="tabpanel" aria-labelledby="nav-url-tab">
                        <div className={`form-group`}>
                            <div className={
                                `input-group ${this.state.url_loading? "form-image-right" : ""}`}
                            >
                                <input type="text" className={`form-control input-large ${this.state.insert_url_has_error? "is-invalid" : ""}`} 
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
                                    insertUrlErrorMessage || "File retrieval failed. Check your the url or your internet connection."
                                }
                                </div>
                                : null
                            }
                        </div>
                        
                        <div className="row images">
                            {
                                this.state.url_images.map((image, index) => {
                                    return <div key={index} className="image-selectior-image-item">
                                        <Image src={image.url} 
                                        onload={() => {
                                            if(image.justAdded) {
                                                this.setState({
                                                    url_loading: false,
                                                    insert_url: ""
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
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div className="tab-pane fade" id="nav-media-library" role="tabpanel" aria-labelledby="nav-media-library-tab">
C
                    </div>
                </div>
                <div className="modal-footer image-selector-footer">
                    {
                        this.state.selected_urls.length == 0?
                        <button 
                            type="button" className="btn btn-primary" 
                            onClick={submitHandler}>
                            {
                                this.state.selected_urls.length == 1?
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
    }
}

export default ImageSelector