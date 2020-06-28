import React from 'react'
import Editable from './Editable';
import ParseClient from '../../../both/Parse';

const IMAGE_MIMES = {
    gif: "image/gif",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    jp2: "image/jp2",
    jxr: "image/jxr",
    webp: "image/webp",
}
const MP4_VIDEO_MIMES = {
    f4a: "video/f4a",
    f4b: "video/f4b",
    f4v: "video/f4v",
    mp4: "video/mp4",
    m4a: "video/m4a",
    m4b: "video/m4b",
    m4v: "video/m4v",
    m4r: "video/m4r",
    mov: "video/mov"
}
const GP3_VIDEO_MIMES = {
    "3gp": "video/3gp",
    "3gp2": "video/3gp2",
    "3g2": "video/3g2",
    "3gpp": "video/3gpp",
    "3gpp2": "video/3gpp2"
}
const OGG_VIDEO_MIMES = {
    ogg: "video/ogg",
    oga: "video/oga",
    ogv: "video/ogv",
    ogx: "video/ogx"
}
const WMV_VIDEO_MIMES = {
    wmv: "video/wmv",
    wma: "video/wma",
    "asf*": "video/asf*",
}
const OTHER_VIDEO_MIMES = {
    webm: "video/webm",
    flv: "video/flv",
    avi: "video/avi",
}

const getAllMimes = () => {
    return {
        ...IMAGE_MIMES,
        ...MP4_VIDEO_MIMES,
        ...GP3_VIDEO_MIMES,
        ...OGG_VIDEO_MIMES,
        ...WMV_VIDEO_MIMES,
        ...OTHER_VIDEO_MIMES
    }
}

const mimeFromUrl = url => {
    if(!url || url.length == 0) return ""
    var index = url.lastIndexOf(".")
    if(index == -1) return ""
    var ext = url.substring(index).toLowerCase()
    var mime = getAllMimes()[ext]
    return mime? mime : ""
}
class FileEditable extends Editable {
    constructor(props) {
        super(props)

        this.state = {
            dataList: [],
            fileShades: [],
            successMessage: this.successMessage,
            errorMessage: this.errorMessage
        }
    }

    newMesage = this.props.emptyUploadMessage? this.props.newUploadMessage : "Please upload a file"
    editMessage = this.props.changeUploadMessage? this.props.changeUploadMessage : "Want to change this file?"
    successMessage = this.props.successMessage? this.props.successMessage : "Upload successfull"
    errorMessage = this.props.errorMessage? this.props.errorMessage : "An error occurred while uploading your video :("

    componentDidMount() {
        this.isFile = true
    }

    init() {
        super.init()
        this.initFile()
    }

    initFile() {
        if(this.Element && this.state.fileShades.length == 0) {
            //get the file relation
            this.Element.relation("data").query().find()
            .then(list => {
                var fileShades = []
                var dataList = []
                for(var i = 0; i < list.length; i++) {
                    var fileData = list[i]
                    var url = fileData.get('file').url()
                    fileShades.push({
                        src: url,
                        mime: this.getFileDataMime(url),
                        width: fileData.get("width"),
                        height: fileData.get("height")
                    })
                    dataList.push(fileData)
                }
                if(fileShades.length > 0) {
                    this.setState({
                        fileShades: fileShades,
                        dataList: dataList
                    })
                }

            })
            .catch(e => {
                handleParseError(e)
            })
        }
    }

    cancelEdit = () => {
        console.log("cancelEdit", this.componentKey, this.state)
        this.setState({
            data: null,
            tags: ""
        })
    }

    save() {
        if(this.detailsHasChanged()) {
            var element = this.getOrCreateEditable()
            var parseFile = this.state.data

            parseFile.save()
            .then(fileResponse => {
                var fileData = this.createFileData(fileResponse)

                fileData.save()
                .then(fileDataResponse => {
                    if(this.state.dataList.length > 0) {
                        element.relation("data").remove(this.state.dataList)
                    }
                    element.relation("data").add(fileDataResponse)
                    if(this.Element) {
                        element.save()
        
                    } else {
                        this.props.addHandler(element, this.getRelationName())
                    }
                })
                .catch(e => {
                    handleParseError(e)
                })
                
            })
            .catch(e => {
                handleParseError(e)
            })
        }
    }

    handleFile = file => {
        var parseFile = new ParseClient.File("file", file)

        this.setState({data: parseFile})
        console.log("handleFile", this.state, JSON.stringify(this.state))
        //return this.props.changeHandler(this.ElementIndex, fileData)

    }

    getFileDataMime = fileData => {
        return mimeFromUrl(fileData)
    }

    fileHasUrl = parseFile => {
        try {
            var url = parseFile.url()
            return true

        } catch {
            return false
        }
    }

    parseFileToDataUrl = parseFile => {
        return "noFile"
    }

    detailsHasChanged () {
        //https://gist.github.com/ajardin/ac96e9b440ae4ab6b162
        return false
    }

}

export default FileEditable