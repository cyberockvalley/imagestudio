import React from "react";
import Header from "./Header";
import HeaderImageBanner from "./HeaderImageBanner";
import NavBar from "./NavBar";
import FooterContactUs from "./FooterContactUs";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { lastValueOrThis, truncText } from "../../both/Functions";
import Page from "./Page";
import { HTML_DESCRIPTION_LENGTH, SEO_BASE_URL } from "../../both/Constants";
import ListEditable from "./editables/ListEditable";
import EditableStateContext from "./editables/EditableStateContext";
import ItemWeddingPhoto from "./items/ItemWeddingPhoto";

import '../res/css/mansory.css'
import '../res/css/loading.css'

class WeddingPhotos extends Page {
  static contextType = EditableStateContext
  constructor(props){
    super(props)
    
    this.handleWeddingPhotosLoadMore = this.handleWeddingPhotosLoadMore.bind(this)
  }

  componentDidMount() {
    this.loadPage("wedding_photos", {
      no_video: true
    })

    
  }

  weddingPhotosRef = weddingPhotosList => {
    this.weddingPhotosList = weddingPhotosList
    
  }

  handleWeddingPhotosLoadMore = e => {
    if(this.weddingPhotosList && !this.state.weddingPhotosLoading) {
      this.setState({weddingPhotosLoading: true})
      this.weddingPhotosList.more(info => {
        //onLoaded
        this.setState({
          weddingPhotosLoading: false,
          weddingPhotosHasNext: info.has_next,
          weddingPhotosHasPrev: info.has_prev
        })
      }, error => {
        //onFailed
        this.setState({weddingPhotosLoading: false})
      })
    }
  }

  buildWeddingPhotosItem = (item, index, onBuildItemName, refGetter) => {
    return (
      <ItemWeddingPhoto 
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
          <title>{lastValueOrThis(this.state.page, {get: () => {return ""}}).get("title")}</title>
          <meta name="description" content={truncText(lastValueOrThis(this.state.page, {get: () => {return ""}}).get("description"), HTML_DESCRIPTION_LENGTH)} />
        
          <meta name="robots" content="index, follow" />
          <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
          <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
          
          <link rel="canonical" href={SEO_BASE_URL + "/portfolio"} />
          
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={lastValueOrThis(this.state.page, {get: () => {return ""}}).get("title")} />
          <meta property="og:description" content={truncText(lastValueOrThis(this.state.page, {get: () => {return ""}}).get("description"), HTML_DESCRIPTION_LENGTH)} />
          <meta property="og:url" content="https://css-tricks.com/its-all-in-the-head-managing-the-document-head-of-a-react-powered-site-with-react-helmet/" />
          <meta property="og:site_name" content="CSS-Tricks" />
          <meta property="article:publisher" content="https://www.facebook.com/CSSTricks" />
          <meta property="article:published_time" content="2019-10-30T15:10:50+00:00" />
          <meta property="article:modified_time" content="2019-12-23T17:11:19+00:00" />
          <meta property="article:author" content="Image Studio" />
          <meta property="article:section" content="Photography" />
          <meta property="article:tag" content="sharp" />
          <meta property="article:tag" content="nice" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:image" content="https://i1.wp.com/css-tricks.com/wp-content/uploads/2019/10/react-helmet.png?ssl=1" />
          <meta name="twitter:creator" content="@CSS" />
          <meta name="twitter:site" content="@CSS" />
        </Helmet>
        <>
          <Header  
            edit={this.state.edit}
            user={this.state.user}
            userRole={this.state.userRole}
            onEditOrSaveButtonClicked={this.handleEditOrSaveButtonClick}
            onCancelEdit={this.handleCancelEdit}
            textEditableProps={this.state.textElementsProps} />
          <HeaderImageBanner 
            path={this.props.location.pathname}
            imageEditableProps={this.state.imageElementsProps} />
          <NavBar />
          <ListEditable 
              requestPageMetasOnNewItem={false}
              className="masonry masonry-col-2 masonry-col-sm-3 masonry-gap-10"
              name={"site_content_home_masonry"}
              onBuildItemName={(index, name) => {
                return `site_content_wedding_photo_${index}${name}`
              }}
              readableName="Wedding photos"
              itemReadableName="Wedding photo"
              {...this.state.listElementsProps}
              rowsPerPage={5}
              privateRef={this.weddingPhotosRef}
              onItem={this.buildWeddingPhotosItem}
              itemDraggable={true}
              item_tag_options={[
                {
                  title: "Select width",
                  description: "Your option determines how much space This image takes on a row. 12 takes a whole row, 6 takes half...",
                  key: "width",
                  values: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
                }
              ]}
              onItemsLoaded = {
                info => {
                this.setState({
                  weddingPhotosHasNext: info.has_next
                })}
              }
          />
          <div className="load-more">
            <button onClick={this.handleWeddingPhotosLoadMore} className={"load-more " + (this.state.weddingPhotosLoading? "loading " : "") + (this.state.weddingPhotosHasNext? "" : "d-none")}>
              <span>Load More</span>
            </button>
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
      </>
    );
  }
}

export default WeddingPhotos;
