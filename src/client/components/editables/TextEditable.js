import React from "react"
import { handleParseError, ParseClasses } from "../../../both/Parse"
import Editable, { TEXT_ELEMENTS_STATE_KEY_PREFIX } from "./Editable"

class TextEditable extends Editable {
    constructor(props) {
        super(props)

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

    cancelEdit = () => {
        console.log("cancelEdit", this.componentKey, this.state)
        this.setState({
            data: "",
            tags: ""
        })
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
            element.set("data", this.state.data)
            element.set("tags", this.state.tags)
            element.set("editor", this.props.user)
            var ACL = this.guessACL()
            element.setACL(ACL)
            return element
        }
    }
    save() {
        if(this.detailsHasChanged()) {
            if(this.notAnObject()) {
                if(!this.Element) this.Element = this.createElement()
                this.props.addHandler(this.Element, this.componentKey, true, true)

            } else {
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
        return this.state.data.length > 0 && this.state.data != this.state.initialData
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

    componentDidMount() {
        super.componentDidMount()
        if(this.props.refSetter) this.props.refSetter(this)
        this.setState({data: "", tags: ""})
        this.ElementClass = ParseClasses.TextElement
    }

    handleEditClick = e => {
        e.preventDefault()
    }

    render() {
        this.init()
        return(
            <>
                {
                    this.props.edit && this.haveWritePermission()?
                        !this.props.is_input_text?
                            <textarea id={this.props.id? this.props.id : ""} class={this.props.class? this.props.class : ""} onClick={this.handleEditClick} 
                            placeholder={this.props.placeholder || `${this.keyToText()}...`} onChange={this.handleChange} style={this.getStyle()}>
                                {this.getText()}
                            </textarea>
                            :
                            <input id={this.props.id? this.props.id : ""} class={this.props.class? this.props.class : ""} type="text" value={this.getText()} onClick={this.handleEditClick} 
                            placeholder={this.props.placeholder || `${this.keyToText()}...`} onChange={this.handleChange} style={this.getStyle()} />
                        :
                        this.props.is_html?
                        <span dangerouslySetInnerHTML={{__html: this.getText()}}></span>
                        :
                        <>{this.getText()}</>
                }
            </>
        )
    }
}

export default TextEditable