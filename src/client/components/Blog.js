import React from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import FooterContactUs from "./FooterContactUs";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { lastValueOrThis, truncText } from "../../both/Functions";
import Page from "./Page";
import { HTML_DESCRIPTION_LENGTH, SEO_BASE_URL, ROWS_PER_LIST, ROLES } from "../../both/Constants";
import TextEditable from "./editables/TextEditable";
import ListEditable from "./editables/ListEditable";
import ItemBlogPost from "./items/ItemBlogPost";
import EditableStateContext from "./editables/EditableStateContext";

class Blog extends Page {
  static contextType = EditableStateContext
  constructor(props){
    super(props)
    this.handleBlogPostsLoadMore = this.handleBlogPostsLoadMore.bind(this)
  }

  componentDidMount() {
    this.loadPage("blog", {
      no_video: true
    })

    
  }

  blogPostsRef = blogPostsList => {
    this.blogPostsList = blogPostsList
    
  }

  handleBlogPostsLoadMore = e => {
    if(this.blogPostsList && !this.state.blogPostsLoading) {
      this.setState({blogPostsLoading: true})
      this.blogPostsList.more(info => {
        //onLoaded
        this.setState({
          blogPostsLoading: false,
          blogPostsHasNext: info.has_next,
          blogPostsHasPrev: info.has_prev
        })
      }, error => {
        //onFailed
        this.setState({blogPostsLoading: false})
      })
    }
  }

  buildBlogPostsItem = (item, index, onBuildItemName, refGetter) => {
    return (
      <ItemBlogPost 
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
          
          <link rel="canonical" href={SEO_BASE_URL + "portfolio"} />
          
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
          <section className="row blog-thread">
            <div className="col-sm-9">
              <ListEditable 
                  requestPageMetasOnNewItem={false}
                  role={ROLES.mod}
                  className="blog-list"
                  name={"site_content_blog_posts"}
                  onBuildItemName={(index, name) => {
                    return `site_content_blog_post_${index}${name}`
                  }}
                  readableName="Blog posts"
                  itemReadableName="Blog post"
                  {...this.state.listElementsProps}
                  rowsPerPage={ROWS_PER_LIST}
                  privateRef={this.blogPostsRef}
                  onItem={this.buildBlogPostsItem}
                  itemDraggable={true}
                  onItemsLoaded = {
                    info => {
                    this.setState({
                      blogPostsHasNext: info.has_next
                    })}
                  }
              />
              <div className="load-more">
                <button onClick={this.handleBlogPostsLoadMore} className={"load-more " + (this.state.blogPostsLoading? "loading " : "") + (this.state.blogPostsHasNext? "" : "d-none")}>
                  <span>Load More</span>
                </button>
              </div>
            </div>
            <div className="col-sm-3 about-blog">
              <div className="blogTitle">
                <h4>
                  <TextEditable 
                    name={"site_info_blog_side_bar_title"}
                    {...this.state.textElementsProps} is_input_text />
                </h4>
              </div>
              <div>
                <p
                  style={{
                    fontSize: "14px",
                    textAlign: "justify"
                  }}
                >
                  <TextEditable 
                    style={{minHeight: 300}}
                    name={"site_info_blog_side_bar_body"}
                    {...this.state.textElementsProps}
                    enable_line_break />
                </p>
              </div>
            </div>
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

export default Blog;
