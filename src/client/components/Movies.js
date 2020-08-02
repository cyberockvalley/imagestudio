import React from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import FooterContactUs from "./FooterContactUs";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { lastValueOrThis, truncText } from "../../both/Functions";
import Page from "./Page";
import { HTML_DESCRIPTION_LENGTH, SEO_BASE_URL, ROLES } from "../../both/Constants";
import TextEditable from "./editables/TextEditable";
import ImageEditable from "./editables/ImageEditable";
import EditableStateContext from "./editables/EditableStateContext";
import ItemMovie from "./items/ItemMovie";
import ListEditable from "./editables/ListEditable";

class Movies extends Page {
  static contextType = EditableStateContext
  constructor(props){
    super(props)
    
    this.handleMoviesLoadMore = this.handleMoviesLoadMore.bind(this)
  }

  componentDidMount() {
    this.loadPage("movies", {
      no_video: true
    })

    
  }

  moviesRef = moviesList => {
    this.moviesList = moviesList
    
  }

  handleMoviesLoadMore = e => {
    if(this.moviesList && !this.state.moviesLoading) {
      this.setState({moviesLoading: true})
      this.moviesList.more(info => {
        //onLoaded
        this.setState({
          moviesLoading: false,
          moviesHasNext: info.has_next,
          moviesHasPrev: info.has_prev
        })
      }, error => {
        //onFailed
        this.setState({moviesLoading: false})
      })
    }
  }

  buildMoviesItem = (item, index, onBuildItemName, refGetter) => {
    return (
      <ItemMovie 
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
          <NavBar />
          <div
            className="row"
            style={{
              background: "#efefef"
            }}
          >
            <section className="row col-11 movie-view">
              <div className="col-md-3 flex-column flex-justify-between d-none d-md-flex">
                <div />
                <div className="movie-more-about-us">
                  <a href>More about our work</a>
                </div>
              </div>
              <div className="col-12 col-md-9 movie-big-picture-box">
                <div
                  className="movie-big-picture">
                    <ImageEditable
                      name="site_info_movies_top_left_background_image"
                      {...this.state.imageElementsProps}
                      spinnerWidth={100}
                      spinnerHeight={100}
                      spinnerThickness={7}
                      spinnerRunnerColor="#f33" />
                </div>
              </div>
              <div className="d-md-none col-12 col-md-3 flex-column">
                <div />
                <div className="movie-more-about-us">
                  <a href>More about our work</a>
                </div>
              </div>
              <div
                className="d-none d-md-block movie-small-picture"
                style={{
                  position: "absolute",
                  left: "50px",
                  width: "35%",
                  height: "80%"
                }}>
                  <ImageEditable
                    name="site_info_movies_top_left_image"
                    {...this.state.imageElementsProps}
                    spinnerWidth={100}
                    spinnerHeight={100}
                    spinnerThickness={7}
                    spinnerRunnerColor="#f33" />
              </div>
            </section>
          </div>
          <div
            className="row"
            style={{
              background: "#222",
              padding: "15px"
            }}
          >
            <ListEditable 
              requestPageMetasOnNewItem={false}
              role={ROLES.mod}
              className="row col-12 movies w-margin-auto"
              name="movies"
              onBuildItemName={(index, name) => {
                return `movies_${index}${name}`
              }}
              readableName="Movies"
              itemReadableName="Movie"
              {...this.state.listElementsProps}
              rowsPerPage={5}
              privateRef={this.moviesRef}
              onItem={this.buildMoviesItem}
              itemDraggable={true}
              onItemsLoaded = {
                info => {
                this.setState({
                  moviesHasNext: info.has_next
                })}
              }
            />
            <div className="load-more">
              <button onClick={this.handleMoviesLoadMore} className={"load-more " + (this.state.moviesLoading? "loading " : "") + (this.state.moviesHasNext? "" : "d-none")}>
                <span>Load More</span>
              </button>
            </div>
          </div>
          <section className="about-us movie-about-us">
            <h2>
                <TextEditable 
                  name={"site_info_about_us_header_text"}
                  {...this.state.textElementsProps} />
            </h2>
            <p>
                <TextEditable 
                  name={"site_info_about_us_body_text"}
                  {...this.state.textElementsProps} />
            </p>
          </section>
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

export default Movies;
