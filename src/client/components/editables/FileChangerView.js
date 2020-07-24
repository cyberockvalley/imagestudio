import React from 'react'
import LoadingSpinner from '../animations/LoadingSpinner'

const $ = require('jquery')

const defaultImageAccept = "image/jpeg,image/png,image/gif,image/*"
const defaultVideoAccept = "video/mp4"

class FileChangerView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            draggedOver: false,
            supportDragOver: true
        }
    }

    rootClass = this.props.id

    elementClass = this.props.className? " " + this.props.className : ""

    state = {
        draggedOver: false,
        supportDragOver: true
    }


    getAccept() {
        if(this.props.accept) {
            return this.props.accept

        } else if(this.props.type) {
            switch(this.props.type) {
                case "image":
                    return defaultImageAccept
                case "video":
                    return defaultVideoAccept
                default: return null
            }

        }
        return null
    }

    handleChange = e => {
        console.log("UploadTracker", "FileChangeView", "handleChange", this.props.id, this.rootClass, e.target.getAttribute("datacheck"), e.target.files[0])
        this.onFile(e.target.files[0])
    }

    onFile = file => {
        if(file && this.props.onFile) {
            this.props.onFile(file)
        }
    }

    componentDidMount() {
        this.setState({accept: this.getAccept()})
        //this.setState({supportDragOver: 'FileReader' in window})
        var that = this
        console.log("ROOT_CLASS", this.rootClass)
        $("."+this.rootClass).on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
          })
          .on('dragover dragenter', function() {
            that.setState({draggedOver: true})
          })
          .on('dragleave dragend drop', function() {
            that.setState({draggedOver: false})
          })
          .on('drop', function(e) {
            that.onFile(e.originalEvent.dataTransfer.files[0])
        })
    }

    styles = {
        root: {
            width: "100%", 
            height: "100%",  
            color: this.props.color? this.props.color : "#242424",
        },
        error: {
            color: this.props.error_color? this.props.error_color : "#ff3333"
        }
    }

    getRootStyle = () => {
        var styles = this.styles.root
        if(this.props.style) {
            styles = {
                ...styles.root,
                ...this.props.style
            }

        }
        //if(this.props.active) styles.paddingTop = 20
        return styles
    }

    render() {
        return(
            <div className={this.rootClass + this.elementClass} style={this.getRootStyle()} onDragEnter={this.handleDragEnter}>
                <div style={!this.state.draggedOver? styles.fileStyle1 : dragStyles.fileStyle1}>
                    <div style={!this.state.draggedOver? styles.fileStyle2 : dragStyles.fileStyle2}>
                        <div style={!this.state.draggedOver? styles.fileStyle3 : dragStyles.fileStyle3}>
                            {
                                this.props.children?
                                this.props.children : <></>
                            }
                            {
                                this.props.active?
                                <div style={{
                                    zIndex: 2000,
                                    width: "100%", position: "absolute", top: "80%",
                                    display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
                                    }}>
                                    {
                                        this.props.error?
                                        <div style={this.styles.error}><i class="fa fa-warning"></i> {this.props.error}</div>
                                        :<></>
                                    }
                                    <div>
                                        <label style={styles.button} for={this.rootClass || "file"}>
                                            <input id={this.rootClass || "file"} datacheck={this.rootClass} onChange={this.handleChange} type="file" style={{display: "none"}} accept={this.state.accept? this.state.accept : ""} />
                                            <span style={styles.buttonText}>Choose File <span style={styles.buttonInnerText}>(or drag and drop it)</span></span>
                                        </label>
                                    </div>
                                </div>
                                :<></>
                            }
                            {
                                this.props.loading?
                                <div style={styles.loadingContainer}>
                                    <LoadingSpinner 
                                        width={this.props.spinnerWidth}
                                        height={this.props.spinnerHeight}
                                        thickness={this.props.spinnerThickness}
                                        circleColor={this.props.spinnerCircleColor}
                                        runnerColor={this.props.spinnerRunnerColor} />
                                </div>:<></>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    loadingContainer: {
        width: "100%",
        height: "100%",
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2500
    },
    loading: {
        width: "7%",
        height: "7%",
        borderRadius: "7%",
        background: "#f33"
    },
    fileStyle1: {
        width: "100%", height: "100%"
    },
    fileStyle2: {
        width: "100%", height: "100%"
    },
    fileStyle3: {
        width: "100%", height: "100%"
    },
    button: {
        padding: 15,
        minWidth: "80%",
        background: "#242424",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        borderRadius: "5px",
        cursor: "pointer"
    },
    buttonText: {
        fontSize: 16
    },
    buttonInnerText: {
        fontSize: 11
    }
}
const dragStyles = {
    fileStyle1: {
        width: "90%", height: "90%", padding: "3px", margin: "auto",
        border: "1px dashed red"
    },
    fileStyle2: {
        width: "100%", height: "100%", padding: "3px",
        border: "1px dashed green"
    },
    fileStyle3: {
        width: "100%", height: "100%", padding: "3px",
        border: "1px dashed blue",
        display: "flex",
        flexDirection: "column",
        justifyContent: "end", alignItems: "center"
    },
}

export default FileChangerView