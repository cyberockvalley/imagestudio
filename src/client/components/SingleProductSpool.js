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

  render() {
    return (
      <div>
        <Header />
        <NavBar />
        <SingleProductThread {...this.props}  
          edit={this.state.edit}
          spoolAttributes={this.state.elementsAttributes}
          threadAdder={this.addThread} />
        <FooterContactUs />
        <Footer />
      </div>
    );
  }
}

export default SingleProductSpool;