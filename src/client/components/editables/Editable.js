import React from 'react'
import ParseClient, { ParseClasses, handleParseError } from '../../../both/Parse'

export const EMPTY_TEXT_ELEMENT_DATA = {data: "", tags: ""}
class Editable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: null,
            tags: ""
        }
    }

    state = {
        data: null,
        tags: ""
    }

    defaultACL = null
    ElementIndex = -1
    Element = null
    ElementBackUp = null
    componentKey = this.props.name
    componentKeyWordSeparator = "_"

    ROLES_ELEMENTS_KEY_START = [
        {
            role: "admins",
            start: ["site_info"]
        },
        
        {
            role: "moderators",
            start: ["site_content"]
        }
    ]


    keyToText = () => {
        var text = this.componentKey.replaceAll(this.componentKeyWordSeparator, " ")
        return text.substring(0, 1).toUpperCase() + text.substring(1)
    }

    init() {
        for(var i = 0; i < this.props.elements.length; i++) {
            var thisElement = this.props.elements[i]
            if(thisElement.get("key") == this.componentKey) {
                this.ElementIndex = i;
                this.Element = thisElement
                this.ElementBackUp = this.props.elements_backup[i]
                this.props.stateHandler(this.componentKey, {
                    data: thisElement.get("data"),
                    tags: thisElement.get("tags")
                })
            }
        }
    }

    cancelEdit = () => {
        console.log("cancelEdit", this.componentKey, this.state)
        this.setState({
            data: this.ElementClass == ParseClasses.TextElement? "" : {},
            tags: "",
            dataFile: null
        })
    }
    
    save = () => {
        console.log("Editable", this.componentKey, this.Element)
        if(this.Element) {
            //console.log("TextEditable", this.componentKey, this.Element.get("text"), this.ElementBackUp)
            if(this.ElementBackUp && 
                (this.Element.get("data") != this.ElementBackUp.data 
                || this.Element.get("tags") != this.ElementBackUp.tags)) {
                this.Element.save()
                .then(res => {
                    console.log("Editable", "save", this.componentKey, res)
                })
                .catch(e => {
                    console.log("Editable", "saveError", this.componentKey, e)
                    handleParseError(e)

                })
            }

        } else {
            if((this.state.data || this.state.dataFile) && !this.elementDataStateEmpty()) {
                console.log("Editable", this.componentKey, "empty!!!")
                var element = new this.ElementClass()
                element.set("key", this.componentKey)
                element.set("tags", this.state.tags)
                element.set("editor", this.props.user)
                var ACL = this.guessACL()
                if(this.ElementClass == ParseClasses.TextElement) {
                    element.set("data", this.state.data)
                    element.setACL(ACL)
                    console.log("G_SAVE", "ACL", ACL)
                    this.props.addHandler(element)
                    
                } else if ([ParseClasses.ImageElement, ParseClasses.VideoElement].includes(this.ElementClass)) {
                    console.log("Editable", this.componentKey, "empty!!!", 2, this.state.parseFile)
                    var parseFile = this.state.dataFile

                    parseFile.save()
                    .then(fileResponse => {
                        var fileData = new this.FileDataClass()
                        fileData.set("file", fileResponse)
                        fileData.setACL(ACL)
                        console.log("Editable", this.componentKey, "fileResponse", fileResponse)
                        fileData.save()
                        .then(fileDataResponse => {
                            element.set("data", [fileDataResponse])
                            console.log("G_SAVE2", "ACL", ACL)
                            this.props.addHandler(element)
                        })
                        .catch(e => {
                            console.log("TextEditable", "fileSave", 1, e)
                            handleParseError(e)
                        })
                    })
                    .catch(e => {
                        console.log("TextEditable", "fileSave", 2, e)
                        handleParseError(e)
                    })

                } else {
                    console.log("Editable", this.componentKey, "empty!!!", 3)
                }
            }
        }
    }

    elementDataStateEmpty = () => {
        if(this.ElementClass == ParseClasses.TextElement) {
            return this.state.data.length == 0 && this.state.tags.length == 0

        } else {
            //"{}".length < 3 => empty
            var dataString = JSON.stringify(this.state.data || this.state.dataFile)
            return (dataString.length < 3 || dataString == "null") && this.state.tags.length == 0
        }
    }

    //haveReadPermission(this.props.user, this.props.userRole, this.Element.get("ACL"))
    haveWritePermission = () => {
        var ACL = this.Element? this.Element.get("ACL") : this.guessedACL
        return !ACL || (
            ACL.getPublicWriteAccess() || 
            ACL.getWriteAccess(this.props.user) || 
            ACL.getRoleWriteAccess(this.props.userRole) 
        )
    }
    
    //haveWritePermission(this.props.user, this.props.userRole, this.Element? this.Element.get("ACL") : this.guessedACL)
    haveReadPermission = () => {
        var ACL = this.Element? this.Element.get("ACL") : this.guessedACL
        return !ACL || (
            ACL.getPublicReadAccess() || 
            ACL.getReadAccess(this.props.user) || 
            ACL.getRoleReadAccess(this.props.userRole) 
        )
    }

    componentDidMount() {
        this.guessedACL = this.guessACL()
    }

    guessACL = () => {
        if(this.componentKey) {
            var ACL;
            for(var i = 0; i < this.ROLES_ELEMENTS_KEY_START.length; i++) {
                for(var j = 0; j < this.ROLES_ELEMENTS_KEY_START[i].start.length; j++) {
                    //this means the element is very likely to be restricted to this role only
                    if(this.componentKey.startsWith(this.ROLES_ELEMENTS_KEY_START[i].start[i])) {
                        ACL = new ParseClient.ACL()
                        ACL.setPublicReadAccess(true)
                        ACL.setRoleWriteAccess(this.ROLES_ELEMENTS_KEY_START[i].role, true)
                        break
                    }
                }
                if(ACL) break
            }
            if(!ACL) {
                if(ParseClient.User.current()) {
                    //give the public read access and the user both read and write access
                    ACL = new ParseClient.ACL(ParseClient.User.current())
                    ACL = ACL.setPublicWriteAccess(false)

                } else {
                    //give no one read or write access
                    ACL = new ParseClient.ACL()
                    ACL = ACL.setPublicReadAccess(false)
                    ACL = ACL.setPublicWriteAccess(false)
                }
            }
            return ACL

        } else {
            return null
        }
    }
}

export default Editable