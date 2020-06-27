import React from 'react'

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

    state = {
        draggedOver: false,
        supportDragOver: true
    }

    rootClass = ("id-" + Math.random()).replace(".","")


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
            position: "absolute", 
            zIndex: 100,
            color: this.props.color? this.props.color : "#242424",
            fontWeight: "bold",
            top: "20px"
        },
        message: {
            color: this.props.message_color? this.props.message_color : "#242424"
        },
        error: {
            color: this.props.error_color? this.props.error_color : "#242424"
        },
        success: {
            color: this.props.success_color? this.props.success_color : "#242424"
        }
    }

    render() {
        return(
            <div class={this.rootClass} style={this.styles.root} onDragEnter={this.handleDragEnter}>
                <div style={!this.state.draggedOver? styles.fileStyle1 : dragStyles.fileStyle1}>
                    <div style={!this.state.draggedOver? styles.fileStyle2 : dragStyles.fileStyle2}>
                        <div style={!this.state.draggedOver? styles.fileStyle3 : dragStyles.fileStyle3}>
                            {
                                this.props.message?
                                <div style={this.styles.message}>{this.props.message}</div>
                                :<></>
                            }
                            {
                                this.props.success?
                                <div style={this.styles.success}>{this.props.success}</div>
                                :<></>
                            }
                            {
                                this.props.error?
                                <div style={this.styles.error}>{this.props.error}</div>
                                :<></>
                            }
                            <div>
                                <label style={styles.button}>
                                    {
                                        this.state.accept?
                                        <input onChange={this.handleChange} name="file" type="file" style={{display: "none"}} accept={this.state.accept} />
                                        :
                                        <input onChange={this.handleChange} name="file" type="file" style={{display: "none"}} />
                                    }
                                    <span style={styles.buttonText}>Choose File <span style={styles.buttonInnerText}>(or drag and drop it)</span></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    fileStyle1: {
        width: "90%", height: "90%", padding: "3px", margin: "auto"
    },
    fileStyle2: {
        width: "100%", height: "100%", padding: "3px"
    },
    fileStyle3: {
        width: "100%", height: "100%", padding: "3px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "end", alignItems: "center"
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
        ...styles.fileStyle1,
        border: "1px dashed red"
    },
    fileStyle2: {
        ...styles.fileStyle2,
        border: "1px dashed green"
    },
    fileStyle3: {
        ...styles.fileStyle3,
        border: "1px dashed blue"
    }
}

export default FileChangerView