import Editable from './Editable';
import ParseClient, { handleParseError } from '../../../both/Parse';

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
            error: null
        }
    }
    errorMessage = this.props.errorMessage? this.props.errorMessage : "An error occurred while uploading :("

    componentDidMount() {
        super.componentDidMount()
        this.setState({data: null, tags: ""})
    }

    init() {
        super.init()
        this.updateFile()
    }

    updateFile() {
        if(this.Element && this.state.fileShades.length == 0 && !this.state.fileRequested) {
            this.setState({fileRequested: true})
            //get the file relation
            this.Element.relation("data").query().find()
            .then(list => {
                this.processData(list)

            })
            .catch(e => {
                handleParseError(e)
                this.setState({fileRequested: false})
            })
        }
    }

    processData = list => {
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
            console.log("FileEditable", 0, element)

            if(this.dataHasChanged()) {
                this.setState({errorMessage: ""})
                this.setState({loading: true})

                parseFile.save()
                .then(fileResponse => {
                    var fileData = this.createFileData(fileResponse)

                    fileData.save()
                    .then(fileDataResponse => {
                        console.log("FileEditable", 1, fileData, fileDataResponse)
                        if(this.state.dataList.length > 0) {
                            console.log("FileEditable", 2, this.state.dataList)
                            element.relation("data").remove(this.state.dataList)
                        }
                        this.processData([fileData])
                        this.setState({loading: false})
                        if(this.Element) {
                            this.props.changeHandler(this.ElementIndex, fileDataResponse)
                            element.save()
            
                        } else {
                            element.relation("data").add(fileDataResponse)
                            this.props.addHandler(element, this.getRelationName())
                        }
                    })
                    .catch(e => {
                        this.setState({error: this.errorMessage})
                        handleParseError(e)
                    })
                    
                })
                .catch(e => {
                    this.setState({error: this.errorMessage})
                    handleParseError(e)
                })

            } else {
                if(this.Element) {
                    this.props.changeHandler(this.ElementIndex, null, this.state.tags)
                    element.save()
    
                }
            }
            
        }
    }
    

    handleFile = file => {
        if(!this.state.initialData) {
            this.setState({
                initialData: this.Element? this.Element.get("data") : "",
                initialTags: this.Element? this.Element.get("tags") : ""
            })
        }
        var parseFile = new ParseClient.File("file", file)

        this.setState({data: parseFile})
        console.log("handleFile", this.state, JSON.stringify(this.state))

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

    detailsHasChangedImplementation () {
        //https://gist.github.com/ajardin/ac96e9b440ae4ab6b162
        return false
    }
    detailsHasChanged() {
        console.log("detailsHasChanged", this.dataHasChanged() || this.tagsHaveChanged())
        return this.dataHasChanged() || this.tagsHaveChanged()
    }

    dataHasChanged() {
        return this.state.data && JSON.stringify(this.state.data).length > 0 && JSON.stringify(this.state.data) != JSON.stringify(this.state.initialData)
    }
    tagsHaveChanged() {
        return this.state.tags.length > 0 && this.state.tags != this.state.initialTags
    }

}

export default FileEditable