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
    }

    componentDidMount() {
        this.isFile = true
    }

    handleFile = file => {
        var parseFile = new ParseClient.File("file", file)

        this.setState({dataFile: parseFile})
        console.log("handleFile", this.state, JSON.stringify(this.state))
        //return this.props.changeHandler(this.ElementIndex, fileData)

    }

    getGetFileDataSRC = fileData => {
        return fileData.get("url")? 
            fileData.get("url") : fileData.get("file")? 
                this.fileHasUrl(fileData.get("file"))? fileData.get("file").url() : parseFileToDataUrl(fileData.get("file"))
                : ""
    }

    getGetFileDataMime = fileData => {
        return mimeFromUrl(this.getGetFileDataSRC(fileData))
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

}

export default FileEditable