import React from "react"
import ParseClient, { handleParseError, ParseClasses } from "../../../both/Parse"
import Editable, { TEXT_ELEMENTS_STATE_KEY_PREFIX } from "./Editable"
import WordProcessor from "../widgets/word/WordProcessor"
import { isObject } from "../../../both/Functions";
import { customDraftToHtml } from "../widgets/word/entities/functions";
import Axios from "axios";
import { BASE_URL, API_SECONDARY_ROOT_DIR, WEB_PAGE_IMAGES_ENDPOINT } from "../../../both/Constants";
import ModalView from "../widgets/ModalView";
import IframeView from "../widgets/IframeView";

class TextEditable extends Editable {
    constructor(props) {
        super(props)
        this.editorRef = React.createRef()

        this.handleEditClick = this.handleEditClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    text_area_style = {
        width: this.props.width? this.props.width : "100%",
        height: this.props.height? this.props.height : "100%",
        resize: this.props.resize? this.props.resize : "vertical",
        borderRadius: this.props.borderRadius? this.props.borderRadius : 3,
        padding: this.props.padding? this.props.padding: "15px",
    }


    input_text_style = {
        width: this.props.width? this.props.width : "100%",
        height: this.props.height? this.props.height : "30px",
        borderRadius: this.props.borderRadius? this.props.borderRadius : 3,
        padding: this.props.padding? this.props.padding: "3px"
    }

    getStyle = () => {
        var style = this.props.is_input_text? this.input_text_style : this.text_area_style
        return this.props.style? {
            ...style,
            ...this.props.style
        } : style
    }
    
    getText = () => {
        //console.log("getText", this.props.userRole, this.props.user, this.Element? this.Element.get("ACL") : "")
        var text = this.Element && this.haveReadPermission()? this.Element.get("data") : this.state.data;
        if(text && !this.props.edit && this.props.enable_line_break) {
            text = text.replaceAll("\n", "<br />")
        }
        return text
    }

    getEditorRawContent = () => {
        var data = this.Element && this.haveReadPermission()? this.Element.get("json_data") : this.state.data;
        //console.log("rawContent", "getEditorRawContent", data, this.componentKey)
        return data
    }

    getEditorDisplayContent = () => {
        var data = this.Element && this.haveReadPermission()? this.Element.get("json_data") : this.state.data;
        data = data? customDraftToHtml(data) : ""
        //console.log("getEd",  this.Element, this.haveReadPermission(), data)
        return data
    }

    cancelEdit = () => {
        //console.log("cancelEdit", this.componentKey, this.state)
        this.setState({
            data: this.props.isHtml? undefined : "",
            tags: ""
        })

        //this.editorRef.clearEditor()
    }

    createElement = () => {
        if(this.notAnObject()) {
            return {
                className: "TextElement",
                get: attribute => {
                    if(attribute == "key") return this.componentKey
                    if(attribute == "data") return this.state.data
                    if(attribute == "tags") return ""
                },
                set: (attribute, value) => {
                    if(attribute == "data") this.Element.set(this.componentKey, value)
                }
            }

        } else {
            var element = new ParseClasses.TextElement()
            element.set("key", this.componentKey)
            if(this.props.isHtml) {
                element.set("json_data", this.state.data)
                element.set("data", "Empty")

            } else {
                element.set("data", this.state.data)
            }
            element.set("is_html", this.props.isHtml)
            element.set("tags", this.state.tags)
            element.set("editor", this.props.user)
            var ACL = this.guessACL()
            element.setACL(ACL)
            return element
        }
    }
    save() {
        if(this.componentKey == "content") {
            console.log("rawContent", "detailsHasChanged", 1)
        }
        if(this.detailsHasChanged()) {
            if(this.componentKey == "content") {
                console.log("rawContent", "detailsHasChanged", true)
            }
            if(this.notAnObject()) {
                if(this.componentKey == "content") {
                    console.log("rawContent", "detailsHasChanged", "notAnObject")
                }
                if(!this.Element) this.Element = this.createElement()
                this.props.addHandler(this.Element, this.componentKey, true, true)

            } else {
                if(this.componentKey == "content") {
                    console.log("rawContent", "detailsHasChanged", "isAnObject")
                }
                if(this.Element) {
                    this.Element.save()
                    
                } else {
                    var element = this.createElement()
                    
                    this.props.addHandler(element, "text_elements")
                }
    
            }
            
        }
    }

    detailsHasChanged() {
        return this.dataHasChanged() || this.tagsHaveChanged()
    }

    dataHasChanged() {
        return (this.state.data.length > 0 && this.state.data != this.state.initialData) 
        || (this.props.isHtml && isObject(this.state.data) && JSON.stringify(this.state.data) != JSON.stringify(this.state.initialData))
    }
    tagsHaveChanged() {
        return this.state.tags.length > 0 && this.state.tags != this.state.initialTags
    }

    handleChange = e => {
        if(!this.state.initialData) {
            this.setState({
                initialData: this.Element? this.Element.get("data") : "",
                initialTags: this.Element? this.Element.get("tags") : ""
            })
        }
        this.setState({data: e.target.value})
        console.log("handleChange", "detailsHasChanged", this.state, !this.Element)
        return this.props.changeHandler(this.ElementIndex, e.target.value)
    }

    handleEditorChange = rawContent => {
        if(!this.state.initialData) {
            this.setState({
                initialData: this.Element? this.Element.get("json_data") : undefined,
                initialTags: this.Element? this.Element.get("tags") : ""
            })
        }
        
        this.setState({data: rawContent})
        console.log("rawContent", "handleEditorChange", rawContent)
        console.log("handleChange", "detailsHasChanged", this.state, !this.Element)
        return this.props.changeHandler(this.ElementIndex, rawContent, null, this.props.isHtml)
    }

    componentDidMount() {
        super.componentDidMount()
        if(this.props.refSetter) this.props.refSetter(this)
        this.setState({data: "", tags: ""})
        this.ElementClass = ParseClasses.TextElement
    }

    handleEditClick = e => {
        e.preventDefault()
    }
  
    wordProcessorUploadHandler = (files) => {
        return new Promise(
        (resolve, reject) => {
            var promises = []
            for(var i = 0; i < files.length; i++) {
                var parseFile = new ParseClient.File("file", files[i])
                promises.push(parseFile.save())
            }
            Promise.all(promises)
            .then(uploads => {
                var urls = []
                uploads.forEach(upload => {
                    urls.push(upload.url())
                })
                resolve({data: {list: urls}})
            })
            .catch(e => {
                reject()
            })
        })
    }

    getImageMediaLibrary = (searchAndFilters) => {
		return new Promise(
			(resolve, reject) => {
			  resolve({ data: { list: ["http://dummy_image_src.com"] } })
			}
		)
    }
    
    getImageFromPage = url => {
        //#SECURITY_CHECK
        return new Promise(
			(resolve, reject) => {
                Axios.get(BASE_URL + API_SECONDARY_ROOT_DIR + WEB_PAGE_IMAGES_ENDPOINT + "?url=" + encodeURI(url))
                .then(response => {
                    if(response.data.result && Array.isArray(response.data.result)) {
                        resolve({ data: { list: response.data.result } })

                    } else {
                        reject()
                    }
                })
                .catch(e => {
                    reject()
                })
			}
		)
    }

    getIframeSource = () => {
        return this.Element && this.haveReadPermission()? "https://www.youtube.com/embed/" + this.Element.get("data") : null
    }
    getIframePlayListId = () => {
        return this.Element && this.haveReadPermission()? this.Element.get("data") : null
    }

    render() {
        this.init()
        const iframeSrc = this.getIframeSource()
        const iframePlayListId = this.getIframePlayListId()
        return(
            <>
                {
                    this.props.edit && this.haveWritePermission()?
                        !this.props.is_input_text?
                            this.props.isHtml?
                                <WordProcessor 
                                    uploadHandler={this.wordProcessorUploadHandler}
                                    imageMediaLibraryHandler={this.getImageMediaLibrary}
                                    imageFromPageHandler={this.getImageFromPage}
                                    imageAlt={this.props.editorImageAlt? this.props.editorImageAlt : ""}
                                    rawContent={this.getEditorRawContent()}
                                    ref={this.editorRef}
                                    onChange={this.handleEditorChange}
                                    placeholder={this.props.placeholder || `${this.keyToText()}...`}
                                />
                            ://else(this.props.isHtml)
                                <textarea id={this.props.id? this.props.id : ""} className={this.props.class? this.props.class : ""} onClick={this.handleEditClick} 
                                    placeholder={this.props.placeholder || `${this.keyToText()}...`} onChange={this.handleChange} style={this.getStyle()}>
                                    {this.getText()}
                                </textarea>
                        ://else(this.props.is_input_text)
                            <input id={this.props.id? this.props.id : ""} class={this.props.class? this.props.class : ""} type="text" value={this.getText()} onClick={this.handleEditClick} 
                            placeholder={this.props.placeholder || `${this.keyToText()}...`} onChange={this.handleChange} style={this.getStyle()} />
                    ://else (this.props.edit && this.haveWritePermission())
                        this.props.isIframe?
                            <IframeView {...this.props.iframeOptions} iframeSrc={iframeSrc} playListId={iframePlayListId} />
                        ://else(this.props.isIframe)
                            this.props.isHtml?
                                <span dangerouslySetInnerHTML={{__html: this.props.onDisplayText? this.props.onDisplayText(this.getEditorDisplayContent()) : this.getEditorDisplayContent()}}></span>
                            ://else(this.props.isHtml)
                                <>
                                {
                                    this.props.enable_line_break?
                                    <span dangerouslySetInnerHTML={{__html: this.props.onDisplayText? this.props.onDisplayText(this.getText()) : this.getText()}}></span>
                                    : <>{this.props.onDisplayText? this.props.onDisplayText(this.getText()) : this.getText()}</>
                                }
                                </>
                }
            </>
        )
    }
}

export default TextEditable