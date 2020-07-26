import React from 'react'
import ParseClient, { ParseClasses, getParseQuery, handleParseError, getParseRole } from '../../both/Parse'
import EditableStateContext from './editables/EditableStateContext'
import { slugify, isObject } from '../../both/Functions'
import { PAGE_404 } from '../../both/Constants'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.handleEditOrSaveButtonClick = this.handleEditOrSaveButtonClick.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)

        this.state = {
            edit: false,
            user: ParseClient.User.current(),
            userRole: getParseRole(),
            totalSavables: 0,

            elementsAttributes: {

            },
            textElementsProps: {
                user: ParseClient.User.current(),
                userRole: getParseRole(),
                edit: false,
                elements: [],
                elements_backup: [],
                changeHandler: this.handleTextChange,
                addHandler: this.addElement,
                stateHandler: this.handleEditableState,
                refSetter: this.setEditorRef
            },

            imageElementsProps: {
                user: ParseClient.User.current(),
                userRole: getParseRole(),
                edit: false,
                elements: [],
                elements_backup: [],
                changeHandler: this.handleImageChange,
                addHandler: this.addElement,
                stateHandler: this.handleEditableState,
                refSetter: this.setEditorRef
            },

            videoElementsProps: {
                user: ParseClient.User.current(),
                userRole: getParseRole(),
                edit: false,
                elements: [],
                elements_backup: [],
                changeHandler: this.handleVideoChange,
                addHandler: this.addElement,
                stateHandler: this.handleEditableState,
                refSetter: this.setEditorRef
            },

            iframeElementsProps: {
                user: ParseClient.User.current(),
                userRole: getParseRole(),
                edit: false,
                elements: [],
                elements_backup: [],
                changeHandler: this.handleIframeChange,
                addHandler: this.addElement,
                stateHandler: this.handleEditableState,
                refSetter: this.setEditorRef
            },

            listElementsProps: {
                user: ParseClient.User.current(),
                userRole: getParseRole(),
                edit: false,
                elements: [],
                elements_backup: [],
                changeHandler: this.handleListChange,
                addHandler: this.addElement,
                stateHandler: this.handleEditableState,
                refSetter: this.setEditorRef
            }
        }
    }

    
    editors = []

    setEditorRef = editor => {
        if(!this.editors.includes(editor)) this.editors.push(editor)
    }

    getElementGroup = element => {
        console.log("getElementGroup", element.className)
        switch(element.className) {
            case "TextElement":
                return this.state.textElementsProps
            case "ImageElement":
                return this.state.imageElementsProps
            case "VideoElement":
                return this.state.videoElementsProps
            case "IframeElement":
                return this.state.iframeElementsProps
            case "ListElement":
                return this.state.listElementsProps
            default:
                return null
        }
    }

    updateElementGroup = (element, props) => {
        console.log("updateElementGroup", element.className)
        switch(element.className) {
            case "TextElement":
                this.setState({textElementsProps: props})
                break
            case "ImageElement":
                this.setState({textElementsProps: props})
                break
            case "VideoElement":
                this.setState({textElementsProps: props})
                break
            case "IframeElement":
                this.setState({textElementsProps: props})
                break
            case "ListElement":
                this.setState({textElementsProps: props})
                break
            default:
                console.log("updateElementGroup", "could not detect element group", element)
                return
        }
    }

    addElement = (element, field, notRelation, notAnObject) => {
        var props = this.getElementGroup(element)
        if(props == null) return
        if(["TextElement", "IframeElement"].includes(element.className)) {
            props.elements.push(element)
            this.updateElementGroup(element, props)
        }
        var page = this.state.page
        if(this.props.index && !isNaN(parseInt(this.props.index)) && parseInt(this.props.index) > 0) {
            page.set("position_as_an_item", parseInt(this.props.index))
        }
        if(notRelation) {
            page.set(field, notAnObject? element.get("is_html")? element.get("json_data") : element.get("data") : element)
            //update savables counter
            this.totalSavables = this.totalSavables - 1

            //to avoid sending multiple update request to server on same page,
            // it is important to check if the last element has been updated on the page.
            //If not checked, for every element updated, the server will receive a update request 
            // for the page. This is obviously. We should wait until the last element has been updated
            // on the page before sending the page itself for update
            if(this.totalSavables == 0) {
                if((!page.get("slug") || page.get("slug").length == 0) && page.get("title") && page.get("title").length > 0) {
                    page.set("slug", slugify(page.get("title")))
                    this.setState({page: page})
                }
                page.save()
            }

        } else {
            element.save()
            .then(elementRes => {
                if(!["TextElement", "IframeElement"].includes(element.className)) {
                    props.elements.push(elementRes)
                    this.updateElementGroup(elementRes, props)
                }
                page.relation(field).add(elementRes)
                //update savables counter
                this.totalSavables = this.totalSavables - 1

                if(this.totalSavables == 0) {
                    if((!page.get("slug") || page.get("slug").length == 0) && page.get("title") && page.get("title").length > 0) {
                        page.set("slug", slugify(page.get("title")))
                        this.setState({page: page})
                    }
                    page.save()
                }

            })
            .catch(e => {
                console.log("addElement", "saveNewError", element.get("key"), e)
                handleParseError(e)

            })
        }
    }

    handleEditableState = (key, criticalData) => {
        var attrs = this.state.elementsAttributes
        attrs[[key]] = criticalData
        //this.setState({elementsAttributes: attrs})
    }
    

    handleTextChange = (index, value, tags, isHtml) => {
        if(index > -1) {
            var props = this.state.textElementsProps
            var elements = props.elements
            if(value) {
                if(!isHtml) {
                    elements[index].set("data", value)
                } else {
                    elements[index].set("json_data", value)
                }
            }
            if(tags && tags.length > 0) {
                elements[index].set("tags", tags)
            }
            props.elements = elements
            this.setState({textElementsProps: props})
        }
    }

    handleImageChange = (index, value) => {

    }

    handleVideoChange = (index, fileData, tags) => {
        if(index > -1) {
            var props = this.state.videoElementsProps
            var elements = props.elements
            if(fileData) {
                elements[index].relation("data").add(fileData)
            }
            if(tags && tags.length > 0) {
                elements[index].set("tags", tags)
            }
            props.elements = elements
            this.setState({videoElementsProps: props})
        }
    }

    handleIframeChange = (index, value) => {
        
    }

    handleListChange = (index, value) => {
        
    }

    getPage = (key, options) => {
        if(this.state.page) {
            console.log("getPage", key, this.state.page)
            return new Promise((resolve, reject) => {
                resolve(null)
            })
        } else {
            var pageQuery = getParseQuery(ParseClasses.Page)
            if(options && options.isLocal) {
                if(!Array.isArray(key)) {
                    pageQuery.equalTo("local_key", key)

                } else {
                    pageQuery.containedIn("local_key", key)
                }

            } else {
                if(!Array.isArray(key)) {
                    pageQuery.equalTo("key", key)

                } else {
                    pageQuery.containedIn("key", key)
                }
            }
            if(options && options.slug) {
                pageQuery.equalTo("slug", options.slug)
            }
            pageQuery.include("featured_image")
            pageQuery.include("featured_image.editor")
            return pageQuery.first()
        }
    }

    loadPage = (key, options) => {
        if(isObject(key)) {
            this.setState({page: key})
        }
        this.getPage(key, options)
        .then(page => {
            if(page) {
                this.setState({page: page})
            }
            
            if(!this.state.page ) {
                this.props.history.push(PAGE_404)
            }
            
            //expose title to edit
            var textElementsProps = this.state.textElementsProps
            textElementsProps.elements.push({
                className: "TextElement",
                get: attribute => {
                    if(attribute == "key") return "title"
                    if(attribute == "data") return this.state.page.get("title")
                    if(attribute == "tags") return ""
                },
                set: (attribute, value) => {
                    if(attribute == "data") this.state.page.set("title", value)
                }
            })
            //expose description to edit
            textElementsProps.elements.push({
                className: "TextElement",
                get: attribute => {
                    if(attribute == "key") return "description"
                    if(attribute == "data") return this.state.page.get("description")
                    if(attribute == "tags") return ""
                },
                set: (attribute, value) => {
                    if(attribute == "data") this.state.page.set("description", value)
                }
            })
            this.setState({textElementsProps: textElementsProps})

            //expose featured_image to edit
            
            if(this.state.page.get("featured_image")) {
                var imageElementsProps = this.state.imageElementsProps
                imageElementsProps.elements.push(this.state.page.get("featured_image"))
                this.setState({imageElementsProps: imageElementsProps})
            }

            //get and set the text elements
            if(!options || !options.no_text || !options.text_limit || options.text_limit > 0) {
                this.loadTexts(options)
            }

            //get and set the image elements
            if(!options || !options.no_image || !options.image_limit || options.image_limit > 0) {
                this.loadImages(options)
            }

            //get and set the video elements
            if(!options || !options.no_video || !options.video_limit || options.video_limit > 0) {
                this.loadVideos(options)
            }

            //get and set the iframe elements
            if(!options || !options.no_iframe || !options.iframe_limit || options.iframe_limit > 0) {
                this.loadIframes(options)
            }

            //get and set the list elements
            if(!options || !options.no_list || !options.list_limit || options.list_limit > 0) {
                this.loadLists(options)
            }
            
        })
        .catch(e => {
            handleParseError(e)
        })
    }

    loadTexts = (options) => {
        var query = this.state.page.relation("text_elements").query()
        if(options && options.text_keys) {
            query.containedIn("key", options.text_keys)
        }
        if(options && options.text_limit) {
            query.limit(options.text_limit)
        }
        query.find()
        .then(list => {
            var props = this.state.textElementsProps
            props.elements = props.elements.concat(list)
            this.setState({textElementsProps: props})

        })
        .catch(e => {
            handleParseError(e)
        })
    }

    loadImages = (options) => {console.log("ListItem", "loadImages")
        var query = this.state.page.relation("image_elements").query()
        if(options && options.image_keys) {
            console.log("ListItem", "loadImages", "image_keys", options.image_keys)
            query.containedIn("key", options.image_keys)
        }
        if(options && options.image_limit) {
            query.limit(options.image_limit)
        }
        query.find()
        .then(list => {
            if(list.length > 0) {
                console.log("addElementH", "FeaturedImage", 3, list[0], JSON.stringify(list[0]))
            }
            console.log("ListItem", "loadImages", "find", list)
            var props = this.state.imageElementsProps
            props.elements = props.elements.concat(list)
            this.setState({imageElementsProps: props})
            console.log("ListItem", "loadImages", "find", this.state.imageElementsProps)

        })
        .catch(e => {
            handleParseError(e)
        })
    }

    loadVideos = (options) => {
        var query = this.state.page.relation("video_elements").query()
        if(options && options.video_keys) {
            query.containedIn("key", options.video_keys)
        }
        if(options && options.video_limit) {
            query.limit(options.video_limit)
        }
        query.find()
        .then(list => {
            var props = this.state.videoElementsProps
            props.elements = props.elements.concat(list)
            this.setState({videoElementsProps: props})

        })
        .catch(e => {
            handleParseError(e)
        })
    }

    loadIframes = (options) => {
        var query = this.state.page.relation("iframe_elements").query()
        if(options && options.iframe_keys) {
            query.containedIn("key", options.iframe_keys)
        }
        if(options && options.iframe_limit) {
            query.limit(options.iframe_limit)
        }
        query.find()
        .then(list => {
            var props = this.state.iframeElementsProps
            props.elements = props.elements.concat(list)
            this.setState({iframeElementsProps: props})

        })
        .catch(e => {
            handleParseError(e)
        })
    }
/*
    loadLists = (options) => {
        var query = this.state.page.relation("list_elements").query()
        if(options && options.list_keys) {
            query.containedIn("key", options.list_keys)
        }
        if(options && options.list_limit) {
            query.limit(options.list_limit)
        }
        query.find()
        .then(list => {
            var props = this.state.listElementsProps
            props.elements = props.elements.concat(list)
            this.setState({listElementsProps: props})

        })
        .catch(e => {
            handleParseError(e)
        })
    }
*/
    handleEditOrSaveButtonClick = () => {
        if(this.state.edit || (this.context && this.context.edit)) {
            this.switchEditOn(false)
            var savables = 0
            var savablesIds = []
            this.editors.forEach(element => {
                if(element.props.isString || element.props.isPointer) {
                    console.log("addElementH", 0, element.componentKey, savablesIds)
                }
                //to avoid elments with the same key, which will and should definetly contain the same
                // value from updating the same field with the same value on the database multiple times, 
                // a check is necessary to distinctively update the elements
                if(!savablesIds.includes(element.componentKey)) {
                    if(element.props.isString || element.props.isPointer) {
                        console.log("addElementH", 2, element.componentKey, savablesIds)
                    }
                    savablesIds.push(element.componentKey)
                    if(element.detailsHasChanged()) {
                        savables++
                    }
                }
            });
            this.totalSavables = savables
            var saveIds = []
            this.editors.forEach(element => {
                //to avoid elments with the same key, which will and should definetly contain the same
                // value from updating the same field with the same value on the database multiple times, 
                // a check is necessary to distinctively update the elements
                if(!saveIds.includes(element.componentKey)) {
                    saveIds.push(element.componentKey)
                    element.save()
                }
            });

        } else {
            this.saveBackUp()
            this.switchEditOn(true)
        }
    }

    handleCancelEdit = () => {
        this.restoreBackUp()
        this.switchEditOn(false)
        this.editors.forEach(element => {
            element.cancelEdit()
        })
    }

    switchEditOn = yesOrNo => {
        var currentState = this.state
        currentState.edit = yesOrNo

        //textElements
        currentState.textElementsProps.edit = yesOrNo
        //imageElements
        currentState.imageElementsProps.edit = yesOrNo
        //videoElements
        currentState.videoElementsProps.edit = yesOrNo
        //iframeElements
        currentState.iframeElementsProps.edit = yesOrNo
        //listElements
        currentState.listElementsProps.edit = yesOrNo
        
        this.setState(currentState)
    }

    saveElementsBackup = props => {
        var backup = []
        for(var i = 0; i < props.elements.length; i++) {
            backup[i] = {
                data: props.elements[i].get("data"),
                tags: props.elements[i].get("tags")
            }
            if(props.elements[i].className == "TextElement") {
                console.log("saveBa", props.elements)
                backup[i].json_data = props.elements[i].get("json_data")
            }
        }
        props.elements_backup = backup
    }

    restoreElementsBackUp = (props, onSetState) => {
        var currentLists = props.elements
        for(var i = 0; i < props.elements.length; i++) {
            if(props.elements_backup[i].json_data) {
                currentLists[i].set("json_data", props.elements_backup[i].json_data)
            }
            currentLists[i].set("data", props.elements_backup[i].data)
            currentLists[i].set("tags", props.elements_backup[i].tags)
        }
        props.elements = currentLists
        onSetState(props)
    }

    saveBackUp = () => {
        //textELements
        this.saveElementsBackup(this.state.textElementsProps)

        //imageELements
        this.saveElementsBackup(this.state.imageElementsProps)

        //videoELements
        this.saveElementsBackup(this.state.videoElementsProps)

        //iframeELements
        this.saveElementsBackup(this.state.iframeElementsProps)

        //listELements
        this.saveElementsBackup(this.state.listElementsProps)
    }

    restoreBackUp = () => {
        //textELements
        this.restoreElementsBackUp(this.state.textElementsProps, (props) => {
            this.setState({textElementsProps: props})
        })

        //imageELements
        this.restoreElementsBackUp(this.state.imageElementsProps, (props) => {
            this.setState({imageElementsProps: props})
        })

        //videoELements
        this.restoreElementsBackUp(this.state.videoElementsProps, (props) => {
            this.setState({videoElementsProps: props})
        })

        //iframeELements
        this.restoreElementsBackUp(this.state.iframeElementsProps, (props) => {
            this.setState({iframeElementsProps: props})
        })

        //listELements
        this.restoreElementsBackUp(this.state.listElementsProps, (props) => {
            this.setState({listElementsProps: props})
        })
    }

    render(child) {
        return (<EditableStateContext.Provider value={{
            edit: this.state.edit,
            ...this.state.elementsAttributes,
            textElementsProps: {
                ...this.state.textElementsProps
            },
            imageElementsProps: {
                ...this.state.imageElementsProps
            },
            videoElementsProps: {
                ...this.state.videoElementsProps
            },
            iframeElementsProps: {
                ...this.state.iframeElementsProps
            },
            listElementsProps: {
                ...this.state.listElementsProps
            }
            }}>
            {child}
        </EditableStateContext.Provider>)
    }
    
}

export default Page