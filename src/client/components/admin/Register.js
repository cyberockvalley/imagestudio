import React from 'react'
import Header from '../Header'
import NavBar from '../NavBar'
import FooterContactUs from '../FooterContactUs'
import Footer from '../Footer'
import Page from '../Page'
import EditableStateContext from '../editables/EditableStateContext'
import { isNullOrEmpty, isValidEmail } from '../../../both/Functions'
import ParseClient, { handleParseError } from '../../../both/Parse'
import { PAGE_TITLE_SEPERATOR, SITE_NAME } from '../../../both/Constants'
import { Helmet } from 'react-helmet'

class Register extends Page {
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
            alert("Please enter an email address.")
            hasError = true

        } else if(!isValidEmail(this.state.email)) {
            alert("Please enter a valid email address.")
            hasError = true

        } else if(isNullOrEmpty(this.state.username)) {
            alert("Please enter a username.")
            hasError = true

        }
        if(isNullOrEmpty(this.state.password1)) {
            alert("Please enter your password.")
            hasError = true

        } else if(isNullOrEmpty(this.state.password2)) {
            alert("Please confirm your password.")
            hasError = true

        } else if(this.state.password1 != this.state.password2) {
            alert("Your password did not match.")
            hasError = true

        }
        if(!hasError) {
            var user = new ParseClient.User()
            user.set("username", this.state.username)
            user.set("email", this.state.email)
            user.set("password", this.state.password1)
            user.signUp()
            .then(user => {
                this.setState({loading: false})
                alert(`Please check your email inbox or spam folder for the email verification process we just sent you.`)
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

    render() {
        return super.render(
            <>
                <Helmet>
                    <title>
                        {`${SITE_NAME} ${PAGE_TITLE_SEPERATOR} Sign Up`}
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
                            <label for="email">Email address</label>
                            <input onChange={this.handleChange} type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
                            <small id="emailHelp" className="form-text text-muted d-none">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label for="username">Username</label>
                            <input onChange={this.handleChange} type="text" className="form-control" id="username" name="username" placeholder="Enter username" />
                        </div>
                        <div className="form-group">
                            <label for="password1">Password</label>
                            <input onChange={this.handleChange} type="password" className="form-control" id="password1" name="password1" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <label for="password2">Confirm Password</label>
                            <input onChange={this.handleChange} type="password" className="form-control" id="password2" name="password2" placeholder="Re-enter Password" />
                        </div>
                        <button type="submit" className={`btn btn-secondary`} disabled={this.state.loading}>{this.state.loading? <i>Please wait...</i> : "Sign Up"}</button>
                    </form>
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

export default Register