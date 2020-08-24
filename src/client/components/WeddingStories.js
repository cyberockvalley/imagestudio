import React from "react";
import Header from "./Header";
import HeaderImageBanner from "./HeaderImageBanner";
import NavBar from "./NavBar";
import FooterContactUs from "./FooterContactUs";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { lastValueOrThis, truncText } from "../../both/Functions";
import Page from "./Page";
import { HTML_DESCRIPTION_LENGTH, SEO_BASE_URL, ROLES, ROWS_PER_LIST } from "../../both/Constants";
import ListEditable from "./editables/ListEditable";
import EditableStateContext from "./editables/EditableStateContext";
import ItemWeddingStory from "./items/ItemWeddingStory";


import '../../static/css/loading.css'

class WeddingStories extends Page {
  static contextType = EditableStateContext
  constructor(props){
    super(props)
    
    this.handleWeddingStoriesLoadMore = this.handleWeddingStoriesLoadMore.bind(this)
  }

  componentDidMount() {
    this.loadPage("wedding_stories", {
      no_video: true
    })

    
  }

  weddingStoriesRef = weddingStoriesList => {
    this.weddingStoriesList = weddingStoriesList
    
  }

  handleWeddingStoriesLoadMore = e => {
    if(this.weddingStoriesList && !this.state.weddingStoriesLoading) {
      this.setState({weddingStoriesLoading: true})
      this.weddingStoriesList.more(info => {
        //onLoaded
        this.setState({
          weddingStoriesLoading: false,
          weddingStoriesHasNext: info.has_next,
          weddingStoriesHasPrev: info.has_prev
        })
      }, error => {
        //onFailed
        this.setState({weddingStoriesLoading: false})
      })
    }
  }

  buildWeddingStoriesItem = (item, index, onBuildItemName, refGetter) => {
    return (
      <ItemWeddingStory 
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
          <Header history={this.props.history} 
            edit={this.state.edit}
            user={this.state.user}
            userRole={this.state.userRole}
            onEditOrSaveButtonClicked={this.handleEditOrSaveButtonClick}
            onCancelEdit={this.handleCancelEdit}
            textEditableProps={this.state.textElementsProps} />
          <NavBar />
          <HeaderImageBanner 
            name="site_info_wedding_stories_header_image"
            imageEditableProps={this.state.imageElementsProps} />
          <ListEditable 
              requestPageMetasOnNewItem={false}
              role={ROLES.mod}
              className="stories"
              name={"site_content_wedding_stories"}
              onBuildItemName={(index, name) => {
                return `site_content_wedding_story_${index}${name}`
              }}
              readableName="Wedding stories"
              itemReadableName="Wedding story"
              {...this.state.listElementsProps}
              rowsPerPage={ROWS_PER_LIST}
              privateRef={this.weddingStoriesRef}
              onItem={this.buildWeddingStoriesItem}
              itemDraggable={true}
              onItemsLoaded = {
                info => {
                this.setState({
                  weddingStoriesHasNext: info.has_next
                })}
              }
          />
          <div className="load-more">
            <button onClick={this.handleWeddingStoriesLoadMore} className={"load-more " + (this.state.weddingStoriesLoading? "loading " : "") + (this.state.weddingStoriesHasNext? "" : "d-none")}>
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

export default WeddingStories;