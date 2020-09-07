import React from 'react'
import ParseClient, { getParseQuery } from '../../../both/Parse'
import { ROLES } from '../../../both/Constants'
import ModalView from '../widgets/ModalView'
import ModalBody from '../widgets/ModalBody'
const dateFormat = require('dateformat')

class ItemUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.elevate = this.elevate.bind(this)
    }

    elevateRequest = type => {
        var roleQ = getParseQuery(ParseClient.Role)
        roleQ.equalTo("name", type)

        roleQ.first()
        .then(role => {
            role.getUsers().add(this.props.page)
            role.save()
            .then(r => {
                alert(`Elevation to ${type} successfull`)
            })
            .catch(e => {
                this.setState({dialog: e.message, dialogOk: () => {
                    this.closeDialog()
                }})
            })

        })
        .catch(e => {
            this.setState({dialog: e.message, dialogOk: () => {
                this.closeDialog()
            }})
        })
        
    }

    ELEVATIONS_WARNINGS = {
        [ROLES.admins]: {
            msg: "Are you sure you want to make this user an admin! Note that the user will have permission to create, edit, delete posts, and also change site's information like contact email, phone number, Site name and also be able to elevate other users, as well as lower other admins and moderators.",
            okHandler: () => {
                this.closeDialog()
                this.elevateRequest(ROLES.admins)
            }
        },
        [ROLES.mod]: {
            msg: "Are you sure you want to make this user a moderator? Note that the user will have permission to create and edit posts.",
            okHandler: () => {
                this.closeDialog()
                this.elevateRequest(ROLES.mod)
            }
        }
    }

    componentDidMount() {
        //console.log("UserPage", this.props.page, JSON.stringify(this.props.page))
    }

    getDate = () => {
        //"dddd, mmmm dS, yyyy, h:MM:ss TT" => Saturday, June 9th, 2007, 5:46:21 PM
        return this.props.page? dateFormat(this.props.page.get("createdAt"), "mmmm d, yyyy") : ""
    }

    elevate = e => {
        var level = e.target.getAttribute("dataLevel")
        var w = this.ELEVATIONS_WARNINGS[level].msg
        if(w) {
            this.setState({dialog: w, dialogOk: this.ELEVATIONS_WARNINGS[level].okHandler})
        }
    }

    closeDialog = () => {
        this.setState({dialog: null})
    }

    render() {
        return (
            <>
                {
                    this.props.page.get("username") != ParseClient.User.current().get("username")?
                    <div className="card" style={{width: "18rem"}}>
                        <div className="card-body">
                            <h5 className="card-title">@{this.props.page.get("username")}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{this.props.page.get("emailVerified")? "Email Verified" : "Email Not Verified"}</h6>
                            <p className="card-text">Registered on {this.getDate()}.</p>
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Elevate User
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" style={{marginBottom: "17px"}} onClick={this.elevate} dataLevel={ROLES.mod}>Make Moderator</a>
                                    <a className="dropdown-item" style={{padding: "17px"}} onClick={this.elevate} dataLevel={ROLES.admins}>Make Admin</a>
                                </div>
                            </div>
                        </div>
                        <ModalView open={this.state.dialog? true : false} onClose={this.closeDialog}>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "90%", maxWidth: "500px", margin: "25px auto"}}>
                                <ModalBody 
                                    content={this.state.dialog}
                                    okText={"It's alright."}
                                    okHandler={this.state.dialogOk}
                                    cancelHandler={this.closeDialog} />
                            </div>
                        </ModalView>
                    </div> : null
                }
            </>
        )
    }
}

export default ItemUser