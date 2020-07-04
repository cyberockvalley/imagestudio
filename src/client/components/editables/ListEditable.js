import React from "react"
import { handleParseError, ParseClasses } from "../../../both/Parse"
import Editable, { TEXT_ELEMENTS_STATE_KEY_PREFIX } from "./Editable"

class ListEditable extends Editable {
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

    cancelEdit = () => {
        console.log("cancelEdit", this.componentKey, this.state)
        this.setState({
            data: "",
            tags: ""
        })
    }

    save() {/*
        if(this.detailsHasChanged()) {
            if(this.Element) {
                this.Element.save()
                
            } else {
                var element = new ParseClasses.TextElement()
                element.set("key", this.componentKey)
                element.set("data", this.state.data)
                element.set("tags", this.state.tags)
                element.set("editor", this.props.user)
                var ACL = this.guessACL()
                element.setACL(ACL)
                this.props.addHandler(element, "text_elements")
            }

        }*/
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
        if(this.props.privateRef) {
            this.props.privateRef(this)
        }
        this.setState({data: "", tags: "", items: []})
        this.ElementClass = ParseClasses.ListElement
    }

    handleEditClick = e => {
        e.preventDefault()
    }

    //pagination methods exposed through the privateRef props START
    next = () => {

    }

    prev = () => {
        
    }

    hasNext = () => {

    }

    hasPrev = () => {

    }

    fetchedCount = () => {

    }

    totalResult = () => {

    }
    //pagination methods exposed through the privateRef props END

    addNew = () => {
        var items = this.state.items
        items.push(null)
        this.setState({items: items})
    }

    getPages() {
        if(this.Element && this.state.items.length == 0 && !this.state.pagesRequested) {
            this.setState({pagesRequested: true})
            var pageQuery = getParseQuery(ParseClasses.Page)
            pageQuery.equalTo("key", this.componentKey)
            if(this.props.ascend_position) {
                pageQuery.ascending("position_as_an_item")

            } else if(this.props.descend_position) {
                pageQuery.descending("position_as_an_item")
                
            }
            
            if(this.props.ascend_create) {
                pageQuery.ascending("createdAt")
                
            } else if(this.props.descend_create) {
                pageQuery.descending("createdAt")
                
            }

            if(this.props.ascend_update) {
                pageQuery.ascending("createdAt")
                
            } else if(this.props.descend_update) {
                pageQuery.descending("createdAt")
                
            }

            return pageQuery.find()
            .then(list => {
                this.setState({items: list})

            })
            .catch(e => {
                handleParseError(e)
                this.setState({pagesRequested: false})
            })
        }
    }

    render() {
        this.init()
        this.getPages()
        //console.log("ListEditable", this.haveReadPermission(), this.state)
        return(
            <>
                {
                    this.props.edit && this.haveWritePermission()?
                    <div style={styles.listHeaderContainer}>
                        <h2 style={styles.listHeader} onClick={this.props.onEditOrSaveButtonClicked}>
                            {
                                `List of ${this.props.readableName || this.props.itemReadableName || this.keyToText()}`
                            }
                        </h2>
                    </div>
                    :<></>
                }
                <section class={this.props.className? this.props.className : ""}>
                    {
                        this.state.items && this.haveReadPermission()?
                        this.state.items.map((item, index) => {
                            return this.props.onItem(item, index)
                        })
                        :
                        <></>
                    }
                </section>
                {
                    this.props.edit && this.haveWritePermission()?
                    <div style={styles.addButtonContainer}>
                        <button style={styles.addButton} onClick={this.addNew}>
                            <span>
                                <i className="fa fa-2x fa-plus"></i> Add New {
                                this.props.itemReadableName || this.keyToText()
                                }
                            </span>
                        </button>
                    </div>
                    :<></>
                }
            </>
        )
    }
}

const styles = {
    addButtonContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    addButton: {
        background: "#282828",
        borderColor: "#282828",
        borderRadius: "70px",
        color: "#fff",
        padding: "8px 16px",
        fontSize: "18px",
        margin: "15px",
        cursor: "pointer",
    },
    listHeaderContainer: {
        background: "#282828",
        width: "100%",
        padding: "15px"
    },
    listHeader: {
        color: "#fff",
    }
}

export default ListEditable