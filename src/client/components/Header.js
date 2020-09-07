import React from "react";
import ParseClient from "../../both/Parse";
import TextEditable from "./editables/TextEditable";
import EditableStateContext from "./editables/EditableStateContext";
import { getFromLocalStorage, saveToLocalStorage } from "../../both/Functions";
import { STORAGE_KEYS, ROLES } from "../../both/Constants";

class Header extends React.Component {
  static contextType = EditableStateContext
  constructor(props) {
    super(props)
    this.state = {}
  }

  powerRoles = ["moderators", "admins"]
  
  isLogin = () => {
    if(this.props.user) {
      //console.log("logCheck", "isLogIn", this.props.user)
      return true

    } else {// && this.powerRoles.includes(this.props.userRole)
      //console.log("logCheck", "isLogOut", this.props.user)
      return false
    }
  }

  handleLogout = () => {
    ParseClient.User.logOut()
    saveToLocalStorage(STORAGE_KEYS.roles, [])
    this.setState({})
    this.props.history.push("/admin/in")
  }

  componentDidMount() {
    //console.log("HEADER", 1)
    //console.log("HEADER", this.props.textEditableProps)
    this.setState({mounted: true})
  }

  render() {
    if(!this.state.mounted) return null
    return (
      <header id="header">
        {
          ParseClient.User.current() && getFromLocalStorage(STORAGE_KEYS.roles) && Array.isArray(getFromLocalStorage(STORAGE_KEYS.roles)) && getFromLocalStorage(STORAGE_KEYS.roles).includes(ROLES.mod)?
          <div className={"flex-row flex-justify-between flex-align-center "} style={{padding: "5px", fontSize: "12px !important", background: "#242424", color: "#fff"}}>
            <div className="flex-row flex-align-center">
              <div style={{marginRight: "15px", textTransform: "capitalize"}}>
                {this.props.user? `Welcome, Admin, ${this.props.user.getUsername() || this.props.user.getEmail()}.` : "Please login."}
              </div>
              <button onClick={this.handleLogout} className="load-more" style={{zIndex: 50, marginRight: "15px", fontSize: "12px"}}>
                <i className="fa fa-sign-out-alt"></i> Logout
              </button>
            </div>
            <div className="flex-row flex-align-center">
              <button onClick={this.props.onEditOrSaveButtonClicked} className="load-more" style={{zIndex: 50, marginRight: "15px", fontSize: "12px"}}>
                {
                  !this.props.edit? 
                  <span>
                    <i className="fa fa-edit"></i> Edit Page
                  </span>
                  :
                  <span>
                    <i className="fa fa-save"></i> Save Page
                  </span>
                }
              </button>
              <div onClick={this.props.onCancelEdit} 
                className={"flex-row flex-center-both action" + (this.props.edit? "" : " d-none")} style={
                  {
                    zIndex: 50, 
                    width:"20px", 
                    height: "20px", 
                    background: "#ff3333", 
                    borderRadius: "10px", 
                    textAlign: "center", fontSize: "12px",
                    }}>
                X
              </div>
            </div>
          </div> : null
        }
        <div id="top-panel">
          <div className="container">
            <div className="row">
              <div className="col-11 col-sm-11 col-md-6 col-xl-6">
                <h1 style={{display: this.props.edit? "block" : "none"}}>
                  <TextEditable 
                      name={"site_info_site_name"}
                      {...this.props.textEditableProps} is_input_text/>
                </h1>
                <h1>
                <TextEditable 
                    name={"site_info_header_bar_title"}
                    {...this.props.textEditableProps} is_input_text/>
                </h1>
              </div>
              <div className="col-4 col-sm-11 col-md-3 col-xl-3">
                <TextEditable 
                    name={"site_info_phone_number"}
                    {...this.props.textEditableProps} is_input_text/>
              </div>
              <div className="col-6 col-sm-11 col-md-3 col-xl-3">
                <TextEditable 
                    name={"site_info_email"}
                    {...this.props.textEditableProps} is_input_text/>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
