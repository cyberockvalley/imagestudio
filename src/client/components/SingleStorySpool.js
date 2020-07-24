import React from "react";
import Header from "./Header";
import HeaderImageBanner from "./HeaderImageBanner";
import NavBar from "./NavBar";
import FooterContactUs from "./FooterContactUs";
import Footer from "./Footer";
import Page from "./Page";
import EditableStateContext from "./editables/EditableStateContext";
import SingleStoryThread from "./SingleStoryThread";


class SingleStorySpool extends Page {
  static contextType = EditableStateContext
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.loadPage("single-blog-spool", {
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
    return super.render(
      <>
        <Header 
          edit={this.state.edit}
          user={this.state.user}
          userRole={this.state.userRole}
          onEditOrSaveButtonClicked={this.editOrSaveSpool}
          onCancelEdit={this.handleCancelEdit}
          textEditableProps={this.state.textElementsProps} />
        <NavBar />
        <SingleStoryThread {...this.props}  
          edit={this.state.edit}
          spoolAttributes={this.state.elementsAttributes}
          threadAdder={this.addThread} />
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
    );
  }
}

export default SingleStorySpool;