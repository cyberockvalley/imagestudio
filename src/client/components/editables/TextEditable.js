import React from "react"
import { handleParseError, ParseClasses } from "../../../both/Parse"
import Editable, { TEXT_ELEMENTS_STATE_KEY_PREFIX } from "./Editable"

class TextEditable extends Editable {
    constructor(props) {
        super(props)

        this.handleEditClick = this.handleEditClick.bind(this)
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
        return this.Element && this.haveReadPermission()?
        this.Element.get("data") : this.state.data
    }

    handleChange = e => {
        //this.Element.set("text", e.target.value)
        this.setState({data: e.target.value})
        return this.props.changeHandler(this.ElementIndex, e.target.value)
    }

    componentDidMount() {
        this.props.refSetter(this)
        this.ElementClass = ParseClasses.TextElement
    }

    handleEditClick = e => {
        e.preventDefault()
    }

    render() {//ag dragstart dragend dragover dragenter dragleave d
        this.init()
        return(
            <>
                {
                    this.props.edit && this.haveWritePermission()?
                        !this.props.is_input_text?
                            <textarea id={this.props.id? this.props.id : ""} class={this.props.class? this.props.class : ""} onClick={this.handleEditClick} placeholder={`${this.keyToText()}...`} onChange={this.handleChange} style={this.getStyle()}>
                                {this.getText()}
                            </textarea>
                            :
                            <input id={this.props.id? this.props.id : ""} class={this.props.class? this.props.class : ""} type="text" value={this.getText()} onClick={this.handleEditClick} placeholder={`${this.keyToText()}...`} onChange={this.handleChange} style={this.getStyle()} />
                        :
                        <>{this.getText()}</>
                }
            </>
        )
    }
}

export default TextEditable