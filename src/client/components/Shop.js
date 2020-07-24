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
import { EMPTY_TEXT_ELEMENT_DATA } from "./editables/Editable";
import ListEditable from "./editables/ListEditable";
import EditableStateContext from "./editables/EditableStateContext";
import ItemShopSection1 from "./items/ItemShopSection1";

export const SHOP_SECTION_ONE_KEY = "site_content_products_1"
export const SHOP_SECTION_TWO_KEY = "site_content_products_2"

class Shop extends Page {
  static contextType = EditableStateContext
  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.loadPage("shop", {
      no_video: true
    })

    
  }

  loadMoreProductsOne = () => {
    
  }

  setListRef = (ref, key) => {
    if(key == SHOP_SECTION_ONE_KEY) {
      this.sectionOneList = ref

    } else if(key == SHOP_SECTION_TWO_KEY) {
      this.sectionTwoList = ref

    }
  }

  loadMoreProductsOne = () => {
    if(this.sectionOneList && !this.state.products_1_loading) {
      this.setState({weddingStoriesLoading: true})
      this.weddingStoriesList.more(info => {
        //onLoaded
        this.setState({
          products_1_loading: false,
          products_1_has_next: info.has_next,
          products_1_has_prev: info.has_prev
        })
      }, error => {
        //onFailed
        this.setState({products_1_loading: false})
      })
    }
  }

  buildProductsOneItem = (item, index, onBuildItemName, refGetter) => {
    return (
      <ItemShopSection1
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
          <section className="row">
            <div className="shop-view col-12 col-sm-9 col-md-8">
              <div>
                <div className="shop-title">
                  <TextEditable 
                    name={"site_info_section_1_title"}
                    {...this.state.textElementsProps} is_input_text />
                </div>
                <ListEditable 
                  requestPageMetasOnNewItem={false}
                  role={ROLES.mod}
                  className="row shop-1"
                  name={SHOP_SECTION_ONE_KEY}
                  onBuildItemName={(index, name) => {
                    return `site_content_products_1_${index}${name}`
                  }}
                  readableName={lastValueOrThis(this.state.elementsAttributes.site_info_section_1_title, EMPTY_TEXT_ELEMENT_DATA).data + " Products"}
                  itemReadableName={lastValueOrThis(this.state.elementsAttributes.site_info_section_1_title, EMPTY_TEXT_ELEMENT_DATA).data + " Product"}
                  {...this.state.listElementsProps}
                  rowsPerPage={5}
                  privateRef={this.setListRef}
                  onItem={this.buildProductsOneItem}
                  itemDraggable={true}
                  onItemsLoaded = {
                    info => {
                    this.setState({
                      products_1_has_next: info.has_next
                    })}
                  }
              />
              <div className="load-more">
                <button onClick={this.loadMoreProductsOne} className={"load-more " + (this.state.products_1_loading? "loading " : "") + (this.state.products_1_has_next? "" : "d-none")}>
                  <span>Load More</span>
                </button>
              </div>
              </div>
              <div>
                <div className="shop-title">
                  <TextEditable 
                    name={"site_info_section_2_title"}
                    {...this.state.textElementsProps} is_input_text />
                </div>
                <div className="row shop-2"></div>
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

export default Shop;
