import React from "react";
import Header from "./Header";
import HeaderImageBanner from "./HeaderImageBanner";
import NavBar from "./NavBar";
import FooterContactUs from "./FooterContactUs";
import Footer from "./Footer";
import Page from "./Page";
import EditableStateContext from "./editables/EditableStateContext";
import SingleProductThread from "./SingleProductThread";


class SingleProductSpool extends Page {
  static contextType = EditableStateContext
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.loadPage("single-product-spool", {
      no_video: true,
      no_image: true
    })
  }

  threads = []

  addThread = thread => {
    if(!this.threads.includes(thread)) this.threads.push(thread)
  }

  editOrSaveSpool = () => {
    this.handleEditOrSaveButtonClick()
    this.threads.forEach(thread => {
      thread.handleEditOrSaveButtonClick()
    });
  }

  setNavRef = nav => {
    this.navBar = nav
  }

  onCartUpdate = () => {
    this.navBar.updateCartTotal()
  }

  render() {
    return super.render(
      <div>
        <Header 
          edit={this.state.edit}
          user={this.state.user}
          userRole={this.state.userRole}
          onEditOrSaveButtonClicked={this.editOrSaveSpool}
          onCancelEdit={this.handleCancelEdit}
          textEditableProps={this.state.textElementsProps} />
        <NavBar refSetter={this.setNavRef} showCart/>
        <SingleProductThread {...this.props}  
          edit={this.state.edit}
          spoolAttributes={this.state.elementsAttributes}
          spoolElementsProps={{
            texts: this.state.textElementsProps
          }}
          threadAdder={this.addThread}
          onCartUpdate={this.onCartUpdate} />
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
      </div>
    );
  }
}

export default SingleProductSpool;