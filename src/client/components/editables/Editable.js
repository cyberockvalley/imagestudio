import React from 'react'
import ParseClient, { ParseClasses, handleParseError } from '../../../both/Parse'
import { ROLES, STORAGE_KEYS } from '../../../both/Constants'
import Markup from '../Markup'
import { getFromLocalStorage } from '../../../both/Functions'

export const EMPTY_TEXT_ELEMENT_DATA = {data: "", tags: ""}
class Editable extends Markup {
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
        var regex = new RegExp(this.componentKeyWordSeparator, "g")
        var text = this.componentKey.replace(regex, " ")
        return text.substring(0, 1).toUpperCase() + text.substring(1)
    }

    init() {
        if(!this.Element && this.props.elements) {
            for(var i = 0; i < this.props.elements.length; i++) {
                var thisElement = this.props.elements[i]
                
                if(thisElement.className == "ImageElement") {
                    //console.log("addElement", "FeaturedImage", 4, this.componentKey, this.props.link, thisElement, JSON.stringify(thisElement))
                    //console.log("addElement", "FeaturedImage", 5, this.componentKey, this.props.link, JSON.stringify(thisElement.get("featured_image")))
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
    haveWritePermission = () => {
        if(((this.componentKey && this.componentKey.startsWith("anonymous")) || this.props.role == ROLES.anonymous) && !this.Element) return true
        var ACL = !this.Element || !this.notAnObject()? this.guessedACL : this.Element.get("ACL")
        var role = null
        if(this.componentKey && this.componentKey.startsWith("site_info")) {
            role = ROLES.admins

        } else if(this.componentKey && this.componentKey.startsWith("site_content")) {
            role = ROLES.mod
        }
        var permitted = !ACL || (
            ACL.getPublicWriteAccess() ||  
            getFromLocalStorage(STORAGE_KEYS.roles, []).includes(role || this.props.role) ||
            ACL.getWriteAccess(this.props.user)
        )
        //console.log("WriteAcl3", this.componentKey, permitted)
        return permitted
    }
    
    //haveWritePermission(this.props.user, this.props.userRole, this.Element? this.Element.get("ACL") : this.guessedACL)
    haveReadPermission = () => {
        var ACL = !this.Element || !this.notAnObject()? this.guessedACL : this.Element.get("ACL")
        var role = null
        if(this.componentKey && this.componentKey.startsWith("site_info")) {
            role = ROLES.admins

        } else if(this.componentKey && this.componentKey.startsWith("site_content")) {
            role = ROLES.mod
        }
        return !ACL || (
            ACL.getPublicReadAccess() || 
            getFromLocalStorage(STORAGE_KEYS.roles, []).includes(role || this.props.role) ||
            ACL.getReadAccess(this.props.user)
        )
    }

    componentDidMount() {
        if(this.props.refSetter) this.props.refSetter(this, this.props.name)
        this.guessedACL = this.guessACL()
    }

    render(child) {
        return super.render(child)
    }

    isValid = () => {
        return this.props.validityChecker? this.props.validityChecker(this.state.data) : true
    }

    getRoleAcl = (role, readOnlyByRole) => {
        var ACL = new ParseClient.ACL()
        if(!readOnlyByRole) {
            ACL.setPublicReadAccess(true)

        } else {
            ACL.setRoleReadAccess(role, true)
        }
        ACL.setRoleWriteAccess(role, true)
        return ACL
    }

    guessACL = () => {
        if(this.componentKey) {
            var ACL;
            for(var i = 0; i < this.ROLES_ELEMENTS_KEY_START.length; i++) {
                if(this.props.role && this.props.role == this.ROLES_ELEMENTS_KEY_START[i].role) {
                    ACL = this.getRoleAcl(this.ROLES_ELEMENTS_KEY_START[i].role, this.props.readOnlyBy)

                } else {
                    for(var j = 0; j < this.ROLES_ELEMENTS_KEY_START[i].start.length; j++) {
                        //this means the element is very likely to be restricted to this role only
                        if(this.componentKey.startsWith(this.ROLES_ELEMENTS_KEY_START[i].start[i])) {
                            ACL = this.getRoleAcl(this.ROLES_ELEMENTS_KEY_START[i].role, this.props.readOnlyBy)
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
                    ACL.setPublicWriteAccess(this.props.botKey? true : false)
                }
            }
            return ACL

        } else {
            return null
        }
    }
}

export default Editable