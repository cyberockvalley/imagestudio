import React from 'react'
import Header from '../Header'
import NavBar from '../NavBar'
import FooterContactUs from '../FooterContactUs'
import Footer from '../Footer'
import Page from '../Page'
import EditableStateContext from '../editables/EditableStateContext'
import { Link } from 'react-router-dom'
import { isNullOrEmpty, isValidEmail, getFromLocalStorage } from '../../../both/Functions'
import ParseClient, { handleParseError } from '../../../both/Parse'
import { SITE_NAME, PAGE_TITLE_SEPERATOR, ROWS_PER_LIST, ROLES, STORAGE_KEYS } from '../../../both/Constants'
import { Helmet } from 'react-helmet'
import ItemUser from './ItemUser'
import ListEditable from '../editables/ListEditable'

class AdminHome extends Page {
    static contextType = EditableStateContext
    constructor(props) {
        super(props)

        this.handleUsersLoadMore = this.handleUsersLoadMore.bind(this)
    }

    componentDidMount() {
        if(ParseClient.User.current() && getFromLocalStorage(STORAGE_KEYS.roles, []).includes(ROLES.mod)) {
            this.loadPage("header_with_footer", {
                no_video: true,
                no_image: true
            })

        } else {
            this.props.history.push("/admin/in")
        }
    }

    usersRef = usersList => {
        this.usersList = usersList
        
    }
    
    handleUsersLoadMore = e => {
        if(this.usersList && !this.state.usersLoading) {
          this.setState({usersLoading: true})
          this.usersList.more(info => {
            //onLoaded
            this.setState({
              usersLoading: false,
              usersHasNext: info.has_next,
              usersHasPrev: info.has_prev
            })
          }, error => {
            //onFailed
            this.setState({usersLoading: false})
          })
        }
    }

    buildUsersItem = (item, index, onBuildItemName, refGetter) => {
        return (
            <ItemUser
            key={index}
            index={index}
            page={item}
            onBuildItemName={onBuildItemName}
            refGetter={refGetter} />
        )
    }

    render() {
        return super.render(
            <>
                <Helmet>
                    <title>
                        {`${SITE_NAME} ${PAGE_TITLE_SEPERATOR} Admin Home`}
                    </title>
                </Helmet>
                <Header history={this.props.history}
                    edit={this.state.edit}
                    user={this.state.user}
                    userRole={this.state.userRole}
                    onEditOrSaveButtonClicked={this.handleEditOrSaveButtonClick}
                    onCancelEdit={this.handleCancelEdit}
                    textEditableProps={this.state.textElementsProps} />
                <NavBar />
                <div style={styles.form_container}>
                    <div style={{width: "100%"}}>
                        <ul style={{width: "100%"}} class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item d-none">
                                <a class="nav-link" id="moderate-comments-tab" data-toggle="tab" href="#moderate-comments" role="tab" aria-controls="moderate-comments" aria-selected="false">Moderate Comments</a>
                            </li>
                            {
                                ParseClient.User.current() && getFromLocalStorage(STORAGE_KEYS.roles, []).includes(ROLES.admins)?
                                <li class="nav-item">
                                    <a class="nav-link active" id="manage-users-tab" data-toggle="tab" href="#manage-users" role="tab" aria-controls="manage-users" aria-selected="false">Manage Users</a>
                                </li> : null
                            }
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade d-none" id="moderate-comments" role="tabpanel" aria-labelledby="moderate-comments-tab">
                                Comments
                            </div>
                            {
                                ParseClient.User.current() && getFromLocalStorage(STORAGE_KEYS.roles, []).includes(ROLES.admins)?
                                <div class="tab-pane fade show active" id="manage-users" role="tabpanel" aria-labelledby="manage-users-tab">
                                    <ListEditable 
                                        requestPageMetasOnNewItem={false}
                                        className="masonry masonry-col-2 masonry-col-sm-3 masonry-gap-10"
                                        role={ROLES.admins}
                                        {...this.state.listElementsProps}
                                        rowsPerPage={ROWS_PER_LIST}
                                        privateRef={this.usersRef}
                                        onItem={this.buildUsersItem}
                                        onItemsLoaded = {
                                            info => {
                                            this.setState({
                                            usersHasNext: info.has_next
                                            })}
                                        }
                                        itemClass={ParseClient.User}
                                        hideInfo
                                        hideAddButton
                                    />
                                    <div className="load-more">
                                        <button onClick={this.handleUsersLoadMore} className={"load-more " + (this.state.usersLoading? "loading " : "") + (this.state.usersHasNext? "" : "d-none")}>
                                        <span>Load More</span>
                                        </button>
                                    </div>
                                </div> : null
                            }
                            </div>
                    </div>
                </div>
                <FooterContactUs
                edit={this.state.edit}
                user={this.state.user}
                userRole={this.state.userRole}
                textEditableProps={this.state.textElementsProps} />
                <Footer
                edit={this.state.edit}
                user={this.state.user}
                userRole={this.state.userRole}
                textEditableProps={this.state.textElementsProps} />
            </>
        )
    }
}

const styles = {
    form_container: {
        margin: "50px auto", 
        width: "70%", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        flexDirection: "column"
    },
    form: {
        width: "100%",
        maxWidth: "350px",
        background: "#efefef",
        padding: "25px",
        borderRadius: "3px",
        boxShadow: "0px 3px 3px 0px"
    },
    link: {margin: "15px"}
}

export default AdminHome