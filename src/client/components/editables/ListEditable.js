import React from "react"
import { handleParseError, ParseClasses, getParseQuery } from "../../../both/Parse"
import Editable, { TEXT_ELEMENTS_STATE_KEY_PREFIX } from "./Editable"

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Pagination from "./Pagination";
const numberToWords = require('number-to-words')
import EditableStateContext from "./EditableStateContext";

const PAGINATION = {
    default: -1,
    more: 0,
    next: 1,
    prev: 2
}
const ROWS_PER_PAGE = 15
class ListEditable extends Editable {
    static contextType = EditableStateContext
    constructor(props, context) {
        super(props, context)
        this.pagination = this.getNewPagination()
        this.handleEditClick = this.handleEditClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        
        this.state = {...this.state, data: "", tags: "", items: []}
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

    getNewPagination = () => {
        return new Pagination(this.props.rowsPerPage || ROWS_PER_PAGE)
    }

    reset = () => {
        this.pagination.reset()
        //console.log("RESET", "PA", this.pagination.state)
        this.setState({items: []})
        this.firstLoad()
    }

    getStyle = () => {
        var style = this.props.is_input_text? this.input_text_style : this.text_area_style
        return this.props.style? {
            ...style,
            ...this.props.style
        } : style
    }

    cancelEdit = () => {
        //console.log("cancelEdit", this.componentKey, this.state)
        this.setState({
            data: "",
            tags: ""
        })
        var items = this.state.items
        var itemsPerm = []
        items.forEach(element => {
            if(element.page.id) {
                itemsPerm.push(element)
            }
        });
        if(items.length > itemsPerm.length) {
            this.setState({items: itemsPerm})
        }
    }

    addNew = (meta, singleEdit) => {
        var items = this.state.items
        var page = new ParseClasses.Page()
        page.singleEdit = singleEdit
        var index = items.length
        page.set("key", this.componentKey)
        page.set("local_key", this.props.onBuildItemName(index, ""))
        page.set("title", meta && meta.title? meta.title : "")
        page.set("description", meta && meta.description? meta.description : "")
        page.set("slug", meta && meta.description? meta.description : "")
        page.set("editor", this.props.user)
        var ACL = this.guessACL()
        page.setACL(ACL)

        items.push(page)
        //console.log("addNew")
        this.setState({items: items})
        if(this.props.focusOnAdd) {
            setTimeout(() => {
                const element = document.getElementById(encodeURIComponent(this.props.onBuildItemName(numberToWords.toWords(index), "")));

                window.scrollTo({
                    behavior: element ? "smooth" : "auto",
                    top: element ? window.scrollY + element.getBoundingClientRect().top : window.scrollY + 50
                })
                //console.log("ADD_NEW", element, element ? window.scrollY + element.getBoundingClientRect().top : 10)
            }, 0)
        }
    }

    handleAddClick = () => {
        //if(!this.props.edit || !this.haveWritePermission()) return
        if(!this.props.requestPageMetasOnNewItem) {
            this.addNew()

        } else {

        }
    }

    save() {
        this.pageRefs.forEach(page => {
            page.handleEditOrSaveButtonClick()
        });
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
        //console.log("handleChange", "detailsHasChanged", this.state, !this.Element)
        return this.props.changeHandler(this.ElementIndex, e.target.value)
    }

    componentDidMount() {
        super.componentDidMount()
        if(this.props.privateRef) {
            this.props.privateRef(this, this.componentKey)
        }
        this.setState({data: "", tags: "", items: []})
        this.ElementClass = ParseClasses.ListElement
        
        this.firstLoad()
    }

    handleEditClick = e => {
        e.preventDefault()
    }

    firstLoad = () => {
        this.getPages(PAGINATION.default, this.props.onItemsLoaded, this.props.onItemsLoadError)
    }

    //pagination methods exposed through the privateRef props START
    more = (onLoaded, onFailed) => {
        this.getPages(PAGINATION.more, onLoaded, onFailed)
    }
    next = (onLoaded, onFailed) => {
        this.getPages(PAGINATION.next, onLoaded, onFailed)
    }

    prev = (onLoaded, onFailed) => {
        this.getPages(PAGINATION.prev, onLoaded, onFailed)
    }

    hasNext = () => {
        return this.pagination.hasNext()
    }

    hasPrev = () => {
        return this.pagination.hasPrev()
    }

    fetchedCount = () => {

    }

    totalResult = () => {

    }
    //pagination methods exposed through the privateRef props END

    getPages(paginationType, onLoaded, onFailed) {
        if(!this.state.pagesRequested) {
            this.setState({pagesRequested: true})
            var pageQuery = getParseQuery(this.props.itemClass || ParseClasses.Page)
            
            if(!this.props.itemClass || this.props.itemClass == ParseClasses.Page) {
                pageQuery.equalTo("key", this.props.onGetKey? this.props.onGetKey() : this.componentKey)
                if(this.props.ascend_position) {
                    pageQuery.ascending("position_as_an_item")
    
                } else if(this.props.descend_position) {
                    pageQuery.descending("position_as_an_item")
                    
                }
            }
            
            if(this.props.ascend_create) {
                pageQuery.ascending("createdAt")
                
            } else if(this.props.descend_create) {
                pageQuery.descending("createdAt")
                
            }

            if(this.props.ascend_update) {
                pageQuery.ascending("updatedAt")
                
            } else if(this.props.descend_update) {
                pageQuery.descending("updatedAt")
                
            }

            if(this.props.noPagination) {
                pageQuery.limit(this.props.rowsPerPage || ROWS_PER_PAGE)

            } else {
                switch (paginationType) {
                    case PAGINATION.prev:
                        pageQuery.limit(this.pagination.getPrevLimit())
                        pageQuery.skip(this.pagination.getPrevSkip(this.state.items.length))
                        break;
                    default:
                        pageQuery.limit(this.pagination.getNextLimit())
                        pageQuery.skip(this.pagination.getNextSkip(this.state.items.length))
                        break;
                }
            }
            
            pageQuery.include("featured_image")
            pageQuery.include("featured_image.editor")
            pageQuery.ascending("position_as_an_item")
            pageQuery.find()
            .then(list => {
                
                //console.log("List", 3, list)
                if(!this.props.noPagination) {
                    list = this.pagination.update(list)
                }
                if(list.length > 0) {
                    this.setState({items: paginationType == PAGINATION.more? this.state.items.concat(list) : list})

                }
                //console.log("PAGINATION", "itemsCount", this.state.items.length, list, JSON.stringify(list))
                if(onLoaded) onLoaded({has_prev: this.hasPrev(), has_next: this.hasNext()})
                this.setState({pagesRequested: false})
            })
            .catch(e => {
                handleParseError(e)
                if(onFailed) onFailed(e)
                this.setState({pagesRequested: false})
            })
        }
    }

    getPrevPageFromItems = () => {
        if(this.state.items.length == 0) return -1
        return Math.ceil(this.state.items.length / (this.props.rowsPerPage || this.ROWS_PER_PAGE)) - 1
    }

    pageRefs = []

    render() {
        this.init()
        return(
            <>
                {
                    this.props.edit && this.haveWritePermission() && !this.props.hideInfo?
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
                        this.state.items.map((page, index) => {
                            return this.props.onItem(page, page.index || index, this.props.onBuildItemName, (ref) => {
                                this.pageRefs.push(ref)
                            }, this.props.edit && this.haveWritePermission() || page.singleEdit, {
                                getPrev: () => {
                                    var i = (page.index || index) - 1
                                    return i > -1? this.pageRefs[i] : null
                                },
                                getNext: () => {
                                    var i = (page.index || index) + 1
                                    return i < this.state.items.length? this.pageRefs[i] : null
                                },
                                getFirst: () => {
                                    return this.pageRefs[0]
                                },
                                getLast: () => {
                                    return this.pageRefs[this.state.items.length - 1]
                                }
                            })
                        })
                        :
                        <></>
                    }
                </section>
                {
                    this.props.edit && this.haveWritePermission() && !this.props.hideAddButton?
                    <div style={styles.addButtonContainer}>
                        <button style={styles.addButton} onClick={this.handleAddClick}>
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
        padding: 5,
        marginBottom: 10
    },
    listHeader: {
        color: "#fff",
    }
}

export default ListEditable
