import React from 'react'
import ParseClient, { ParseClasses, getParseQuery, handleParseError, getParseRole } from '../../both/Parse'
import EditableStateContext from './editables/EditableStateContext'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.handleEditOrSaveButtonClick = this.handleEditOrSaveButtonClick.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)

        this.state = {
            edit: false,
            user: ParseClient.User.current(),
            userRole: getParseRole(),

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

    state = {
        edit: false,
        user: ParseClient.User.current(),
        userRole: getParseRole(),

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

    editors = []

    setEditorRef = editor => {
        if(!this.editors.includes(editor)) this.editors.push(editor)
    }

    getElementRelationName = element => {
        console.log("getElementRelationName", element.className)
        switch(element.className) {
            case "TextElement":
                return "text_elements"
            case "ImageElement":
                return "image_elements"
            case "VideoElement":
                return "video_elements"
            case "IframeElement":
                return "iframe_elements"
            case "ListElement":
                return "list_elements"
            default:
                return null
        }
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

    addElement = (element) => {
        console.log("addHandler", element, JSON.stringify(element))
        var props = this.getElementGroup(element)
        console.log("addHandler", "props", props)
        if(props == null) return
        props.elements.push(element)
        this.updateElementGroup(element, props)
        console.log("addHandler", "update")
        
        element.save()
        .then(res => {
            console.log("addElement", "saveNew", element.get("key"), res)
            var page = this.state.page
            page.relation(this.getElementRelationName(element)).add(res)
            page.save()
            .then(res => {
                console.log("addElement", "savePage", element.get("key"), res)

            })
            .catch(e => {
                console.log("addElement", "savePageError", element.get("key"), e)
                handleParseError(e)
    
            })

        })
        .catch(e => {
            console.log("addElement", "saveNewError", element.get("key"), e)
            handleParseError(e)

        })

    }

    handleEditableState = (key, criticalData) => {
        var attrs = this.state.elementsAttributes
        console.log("handleEditableState", key, criticalData, attrs)
        attrs[[key]] = criticalData
        //this.setState({elementsAttributes: attrs})
    }
    

    handleTextChange = (index, value) => {
        if(index > -1) {
            var props = this.state.textElementsProps
            var elements = props.elements
            elements[index].set("data", value)
            props.elements = elements
            this.setState({textElementsProps: props})
        }
    }

    handleImageChange = (index, value) => {

    }

    handleVideoChange = (index, fileData) => {
        if(index > -1) {
            var props = this.state.videoElementsProps
            var elements = props.elements
            elements[index].set("data", fileData)
            props.elements = elements
            this.setState({videoElementsProps: props})
        }
    }

    handleIframeChange = (index, value) => {
        
    }

    handleListChange = (index, value) => {
        
    }

    getPage = key => {
        var pageQuery = getParseQuery(ParseClasses.Page)
        console.log("currentUser", this.state.userRole, this.state.user)
        pageQuery.equalTo("key", key)

        pageQuery.first()
        .then(page => {
            this.setState({page: page})
            console.log("State", this.state)

            //get and set the elements
            page.relation("text_elements").query().find()
            .then(list => {
                var props = this.state.textElementsProps
                props.elements = list
                this.setState({textElementsProps: props})

            })
            .catch(e => {
                handleParseError(e)
            })

            //get and set the image_elements
            page.relation("image_elements").query().find()
            .then(list => {
                var props = this.state.imageElementsProps
                props.elements = list
                this.setState({imageElementsProps: props})

            })
            .catch(e => {
                handleParseError(e)
            })

            //get and set the video_elements
            page.relation("video_elements").query().find()
            .then(list => {
                var props = this.state.videoElementsProps
                props.elements = list
                this.setState({videoElementsProps: props})

            })
            .catch(e => {
                handleParseError(e)
            })

            //get and set the iframe_elements
            page.relation("iframe_elements").query().find()
            .then(list => {
                var props = this.state.iframeElementsProps
                props.elements = list
                this.setState({iframeElementsProps: props})

            })
            .catch(e => {
                handleParseError(e)
            })

            //get and set the list_elements
            page.relation("list_elements").query().find()
            .then(list => {
                var props = this.state.listElementsProps
                props.elements = list
                this.setState({listElementsProps: props})

            })
            .catch(e => {
                handleParseError(e)
            })


        })
        .catch(e => {
            handleParseError(e)
        })

    }

    handleEditOrSaveButtonClick = () => {
        if(!this.state.edit) {
            this.saveBackUp()
            this.switchEditOn(true)

        } else {
            this.switchEditOn(false)
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
        }
        props.elements_backup = backup
    }

    restoreElementsBackUp = (props, onSetState) => {
        var currentLists = props.elements
        for(var i = 0; i < props.elements.length; i++) {
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