import React from 'react'
import Page from './Page'
import Header from './Header'
import NavBar from './NavBar'
import FooterContactUs from './FooterContactUs'
import Footer from './Footer'
import EditableStateContext from './editables/EditableStateContext'
import { Link } from 'react-router-dom'

class LicenseInfo extends Page {
    static contextType = EditableStateContext
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.loadPage("header_with_footer", {
          no_video: true,
          no_image: true
        })
    }

    render() {
        return super.render(
            <>
                <Header history={this.props.history}
                    edit={this.state.edit}
                    user={this.state.user}
                    userRole={this.state.userRole}
                    onEditOrSaveButtonClicked={this.handleEditOrSaveButtonClick}
                    onCancelEdit={this.handleCancelEdit}
                    textEditableProps={this.state.textElementsProps} />
                <NavBar showLicenseInfo/>
                <div style={{width: "90%", margin: "55px auto"}}>
                    <div style={{display: "flex", width: "100%", justifyContent: "space-between", marginBottom: "25px"}}>
                        <label>
                            <h1>LicenseInfo</h1>
                        </label>
                        <div>
                            <Link to="/shop" type="button" class="btn btn-secondary">Continue shopping</Link>
                        </div>
                    </div>
                    <div>
                        <a href="https://creativemarket.com/licenses/general" type="button" class="btn btn-secondary">License Info example</a>
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

export default LicenseInfo