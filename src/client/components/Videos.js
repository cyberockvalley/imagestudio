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
import EditableStateContext from "./editables/EditableStateContext";
import ItemVideo from "./items/ItemVideo";
import ListEditable from "./editables/ListEditable";

const VIDEO_TYPES = {
  "videos": {
    list_name: "site_content_wedding_videos",
    list_item_name: "site_content_wedding_video",
    list_readable_name: "Wedding videos",
    list_item_readable_name: "Wedding video",
    banner_name: "wedding_videos_header_banner"
  },
  "videosmusic": {
    list_name: "site_content_music_videos",
    list_item_name: "site_content_music_video",
    list_readable_name: "Music videos",
    list_item_readable_name: "Music video",
    banner_name: "music_videos_header_banner"
  },
  "videoscommercial": {
    list_name: "site_content_commercial_videos",
    list_item_name: "site_content_commercial_video",
    list_readable_name: "Commercial videos",
    list_item_readable_name: "Commercial video",
    banner_name: "commercial_videos_header_banner"
  }
}

class Videos extends Page {
  static contextType = EditableStateContext
  constructor(props){
    super(props)
    
    this.handleVideosLoadMore = this.handleVideosLoadMore.bind(this)
    console.log("PATH_B", this.props.match, this.getVideoKey())
  }

  componentDidMount() {
    this.loadPage("videos", {
      no_video: true
    })

    console.log("PATH", this.props.match)
  }

  videosRef = videosList => {
    this.videosList = videosList
    
  }

  handleVideosLoadMore = e => {
    if(this.videosList && !this.state.videosLoading) {
      this.setState({videosLoading: true})
      this.videosList.more(info => {
        //onLoaded
        this.setState({
          videosLoading: false,
          videosHasNext: info.has_next,
          videosHasPrev: info.has_prev
        })
      }, error => {
        //onFailed
        this.setState({videosLoading: false})
      })
    }
  }

  buildVideosItem = (item, index, onBuildItemName, refGetter) => {
    return (
      <ItemVideo 
        key={index}
        index={index}
        page={item}
        onBuildItemName={onBuildItemName}
        refGetter={refGetter} />
    )
  }

  getVideoKey = () => {
    return this.props.match.url.replace(/\//g, "").toLowerCase()
  }
  getListName = () => {
    return VIDEO_TYPES[this.getVideoKey()].list_name
  }

  getListItemName = () => {
    return VIDEO_TYPES[this.getVideoKey()].list_item_name
  }

  getListReadableName = () => {
    return VIDEO_TYPES[this.getVideoKey()].list_readable_name
  }

  getListItemReadableName = () => {
    return VIDEO_TYPES[this.getVideoKey()].list_item_readable_name
  }

  getBannerName = () => {
    return VIDEO_TYPES[this.getVideoKey()].banner_name
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
              name={this.getBannerName()}
              imageEditableProps={this.state.imageElementsProps} />
          <ListEditable 
              requestPageMetasOnNewItem={false}
              role={ROLES.mod}
              className="row videos"
              name={this.getListName()}
              onBuildItemName={(index, name) => {
                return `${this.getListItemName()}_${index}${name}`
              }}
              readableName={this.getListReadableName()}
              itemReadableName={this.getListItemReadableName()}
              {...this.state.listElementsProps}
              rowsPerPage={ROWS_PER_LIST}
              privateRef={this.videosRef}
              onItem={this.buildVideosItem}
              itemDraggable={true}
              onItemsLoaded = {
                info => {
                this.setState({
                  videosHasNext: info.has_next
                })}
              }
            />
          <div className="load-more">
            <button onClick={this.handleVideosLoadMore} className={"load-more " + (this.state.videosLoading? "loading " : "") + (this.state.videosHasNext? "" : "d-none")}>
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

export default Videos;
