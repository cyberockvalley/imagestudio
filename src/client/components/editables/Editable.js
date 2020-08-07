import React from 'react'
import ParseClient, { ParseClasses, handleParseError } from '../../../both/Parse'
import { ACL } from 'parse'
import { ROLES } from '../../../both/Constants'

export const EMPTY_TEXT_ELEMENT_DATA = {data: "", tags: ""}
class Editable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    state = {}

    isFile = false

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
        if(this.props.elements) {
            for(var i = 0; i < this.props.elements.length; i++) {
                var thisElement = this.props.elements[i]
                
                if(thisElement.className == "ImageElement") {
                    console.log("addElement", "FeaturedImage", 4, this.componentKey, this.props.link, thisElement, JSON.stringify(thisElement))
                    console.log("addElement", "FeaturedImage", 5, this.componentKey, this.props.link, JSON.stringify(thisElement.get("featured_image")))
                }
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
    }

    notAnObject = () => {
        return this.props.isString || this.props.isArray
    }

    //haveReadPermission(this.props.user, this.props.userRole, this.Element.get("ACL"))
    haveWritePermission = () => { return true
        if((this.componentKey.startsWith("anonymous") || this.props.role == ROLES.anonymous) && !this.Element) return true
        var ACL = !this.Element || !this.notAnObject()? this.guessedACL : this.Element.get("ACL")
        var permitted = !ACL || (
            ACL.getPublicWriteAccess() ||  
            ACL.getRoleWriteAccess(this.props.userRole) ||
            ACL.getWriteAccess(this.props.user)
        )
        console.log("WriteAcl3", this.componentKey, permitted)
        return permitted
    }
    
    //haveWritePermission(this.props.user, this.props.userRole, this.Element? this.Element.get("ACL") : this.guessedACL)
    haveReadPermission = () => {return true
        var ACL = !this.Element || !this.notAnObject()? this.guessedACL : this.Element.get("ACL")
        return !ACL || (
            ACL.getPublicReadAccess() || 
            ACL.getRoleReadAccess(this.props.userRole) ||
            ACL.getReadAccess(this.props.user)
        )
    }

    componentDidMount() {
        if(this.props.refSetter) this.props.refSetter(this, this.props.name)
        this.guessedACL = this.guessACL()
    }

    isValid = () => {
        return this.props.validityChecker? this.props.validityChecker(this.state.data) : true
    }

    getRoleAcl = role => {
        var ACL = new ParseClient.ACL()
        ACL.setPublicReadAccess(true)
        ACL.setRoleWriteAccess(role, true)
        return ACL
    }

    guessACL = () => {
        if(this.componentKey) {
            var ACL;
            for(var i = 0; i < this.ROLES_ELEMENTS_KEY_START.length; i++) {
                if(this.props.role && this.props.role == this.ROLES_ELEMENTS_KEY_START[i].role) {
                    ACL = this.getRoleAcl(this.ROLES_ELEMENTS_KEY_START[i].role)

                } else {
                    for(var j = 0; j < this.ROLES_ELEMENTS_KEY_START[i].start.length; j++) {
                        //this means the element is very likely to be restricted to this role only
                        if(this.componentKey.startsWith(this.ROLES_ELEMENTS_KEY_START[i].start[i])) {
                            ACL = this.getRoleAcl(this.ROLES_ELEMENTS_KEY_START[i].role)
                            break
                        }
                    }
                }
                if(ACL) break
            }
            if(!ACL) {
                if(ParseClient.User.current()) {
                    //give the public read access and the user both read and write access
                    ACL = new ParseClient.ACL(ParseClient.User.current())
                    ACL.setPublicReadAccess(this.props.notReadable? false : true)

                } else {
                    //give no one read or write access
                    ACL = new ParseClient.ACL()
                    ACL.setPublicReadAccess(this.props.notReadable? false : true)
                    ACL.setPublicWriteAccess(false)
                }
            }
            return ACL

        } else {
            return null
        }
    }
}

export default Editable