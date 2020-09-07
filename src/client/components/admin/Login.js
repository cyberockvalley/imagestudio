import React from 'react'
import Header from '../Header'
import NavBar from '../NavBar'
import FooterContactUs from '../FooterContactUs'
import Footer from '../Footer'
import Page from '../Page'
import EditableStateContext from '../editables/EditableStateContext'
import { Link } from 'react-router-dom'
import { isNullOrEmpty, isValidEmail, saveToLocalStorage } from '../../../both/Functions'
import ParseClient, { handleParseError, getRolesSync } from '../../../both/Parse'
import { Helmet } from 'react-helmet'
import TextEditable from '../editables/TextEditable'
import { SITE_NAME, PAGE_TITLE_SEPERATOR, ROLES, STORAGE_KEYS } from '../../../both/Constants'

class Login extends Page {
    static contextType = EditableStateContext
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.loadPage("header_with_footer", {
          no_video: true,
          no_image: true
        })
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault()
        this.setState({loading: true})
        var hasError = false
        if(isNullOrEmpty(this.state.email)) {
            alert("Please enter your email address or username.")
            hasError = true

        }
        if(isNullOrEmpty(this.state.password)) {
            alert("Please enter your password.")
            hasError = true

        }
        if(!hasError) {
            ParseClient.User.logIn(this.state.email, this.state.password)
            .then(async user => {
                var roles = await getRolesSync()
                saveToLocalStorage(STORAGE_KEYS.roles, roles)
                //console.log("ROLES", roles)
                this.setState({loading: false})
                this.props.history.push(roles.includes(ROLES.mod)? "/admin" : "/")
            })
            .catch(e => {
                this.setState({loading: false})
                handleParseError(e)
                alert(e.message)
            })

        } else {
            this.setState({loading: false})
            
        }
        
    }

    resetPassword = () => {
        if(isNullOrEmpty(this.state.email)) {
            alert("Please enter your registered email address.")

        } else if(!isValidEmail(this.state.email)) {
            alert("Please enter a valid email address.")

        } else {
            ParseClient.User.requestPasswordReset(this.state.email)
            .then(user => {
                this.setState({loading: false})
                alert(`Please check your email inbox or spam folder for the password reset steps we just sent you. ${JSON.stringify(user)}`)
            })
            .catch(e => {
                this.setState({loading: false})
                handleParseError(e)
                alert(e.message)
            })
        }
    }

    render() {
        return super.render(
            <>
                <Helmet>
                    <title>
                        {`${SITE_NAME} ${PAGE_TITLE_SEPERATOR} Sign In`}
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
                    <form style={styles.form} onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label for="email">Email address or Username</label>
                            <input onChange={this.handleChange} type="text" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email or username" />
                        </div>
                        <div className="form-group">
                            <label for="password">Password</label>
                            <input onChange={this.handleChange} type="password" className="form-control" id="password" name="password" placeholder="Password" />
                        </div>
                        <button type="submit" className={`btn btn-secondary`} disabled={this.state.loading}>{this.state.loading? <i>Please wait...</i> : "Sign In"}</button>
                    </form>
                    <small onClick={this.resetPassword} className="form-text text-muted action" style={styles.link}>Forgot pasword?</small>
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

export default Login