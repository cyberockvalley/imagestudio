import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import HomeFooterIntro from "./HomeFooterIntro";
import HeaderVideoBanner from "./HeaderVideoBanner";
import NavBar from "./NavBar";

import TextEditable from "./editables/TextEditable";

import { Helmet } from 'react-helmet'
import Page from "./Page";
import EditableStateContext from "./editables/EditableStateContext";
import { lastValueOrThis, truncText } from "../../both/Functions";
import { EMPTY_TEXT_ELEMENT_DATA } from "./editables/Editable";
import { HTML_DESCRIPTION_LENGTH, SEO_BASE_URL, ROLES, META_VARS } from "../../both/Constants";
import ListEditable from "./editables/ListEditable";
import ItemWeddingPhoto from "./items/ItemWeddingPhoto";
import InstaGrid from "./widgets/InstaGrid";
import ImageEditable from "./editables/ImageEditable";

import '../../static/css/mansory.min.css'
import '../../static/css/loading.min.css'

const jQuery = require('jquery')

class Home extends Page {
  static contextType = EditableStateContext
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.loadPage("home")

    
  }

  weddingPhotosRef = weddingPhotosList => {
    this.weddingPhotosList = weddingPhotosList
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
          <title>{META_VARS.site_title}</title>
          <meta name="description" content={META_VARS.site_description} />
        
          <meta name="robots" content="index, follow" />
          <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
          <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
          
          <link rel="canonical" href={META_VARS.site_canonical} />
          <meta property="og:title" content={META_VARS.site_title} />
          <meta property="og:description" content={META_VARS.site_description} />

          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta name="og:image" content={META_VARS.social_image} />
          <meta property="og:title" content={META_VARS.site_title} />
          <meta property="og:description" content={META_VARS.site_description} />
          <meta property="og:url" content={META_VARS.site_canonical} />
          <meta property="og:site_name" content={META_VARS.site_name} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={META_VARS.social_image} />
          <meta name="twitter:description" content={META_VARS.site_description} />
          <meta name="twitter:title" content={META_VARS.site_canonical} />
          <meta name="twitter:site" content={`@${META_VARS.twitter_handle}`} />
          <meta name="twitter:creator" content={`@${META_VARS.twitter_handle}`} />
          <meta name="msvalidate.01" content={META_VARS.msvalidate} />
          <meta name="google-site-verification" content={META_VARS.google_site_verification} />
          <meta name="yandex-verification" content={META_VARS.yandex_verification} />
        </Helmet>
      <>
        <Header history={this.props.history}
          edit={this.state.edit}
          user={this.state.user}
          userRole={this.state.userRole}
          onEditOrSaveButtonClicked={this.handleEditOrSaveButtonClick}
          onCancelEdit={this.handleCancelEdit}
          textEditableProps={this.state.textElementsProps}
          />
        <NavBar />
        <HeaderVideoBanner 
            textEditableProps={this.state.textElementsProps} />
        <div className="flo-block__container">
          <div className="flo-image-block-1 flo-image-block-1--244">
            <div className="flo-image-block-1__top-wrap">
              <h2 className="flo-image-block-1__title col-md-6">
                <TextEditable 
                  name={"site_info_second_title"}
                  {...this.state.textElementsProps} />
              </h2>
              <div className="flo-image-block-1__text-content col-md-6">
                <p>
                  <TextEditable 
                    name={"site_info_second_description"}
                    {...this.state.textElementsProps} />
                </p>
              </div>
            </div>
          </div>
        </div>
        <ListEditable 
              noPagination={true}
              requestPageMetasOnNewItem={false}
              className="masonry masonry-col-2 masonry-col-sm-3 masonry-gap-10"
              name={"site_content_home_masonry"}
              onBuildItemName={(index, name) => {
                return `site_content_wedding_photo_${index}${name}`
              }}
              readableName="Wedding photos"
              itemReadableName="Wedding photo"
              {...this.state.listElementsProps}
              rowsPerPage={30}
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
        />
        <section className="home-instagram" id="home-instagram">
          <div className="home-instagram__inner">
            <div className="section-inner">
              <div className="col-12">
                <div
                  className="title wow slideInUp  animated"
                  style={{
                    visibility: "visible",
                    animationName: "slideInUp"
                  }}
                >
                  <div className="title__inner">
                    <TextEditable 
                      name={"site_info_instagram_header_text"}
                      {...this.state.textElementsProps} is_input_text/>
                  </div>
                </div>
                <a
                  href={`https://instagram.com/${lastValueOrThis(this.state.elementsAttributes.site_info_instagram_username, EMPTY_TEXT_ELEMENT_DATA).data}`}
                  className="social_link wow slideInUp  animated"
                  style={{
                    visibility: "visible",
                    animationName: "slideInUp",
                    display: "block",
                    marginBottom: "40px"
                  }}
                >
                  <i className="fa fa-instagram" />
                </a>
                <div
                  id="sb_instagram"
                  className="sbi sbi_col_3  sbi_width_resp"
                  style={{
                    paddingBottom: "20px",
                    width: "100%"
                  }}
                >
                  <div
                    className="sb_instagram_header "
                    style={{
                      padding: "10px",
                      paddingBottom: 0
                    }}
                  >
                    <a
                      href={this.state.edit? "javascript:void(0)" : `https://instagram.com/${lastValueOrThis(this.state.elementsAttributes.site_info_instagram_username, EMPTY_TEXT_ELEMENT_DATA).data}`}
                      target={this.state.edit? "" : "_blank"}
                      rel="noopener"
                      title={`@${lastValueOrThis(this.state.elementsAttributes.site_info_instagram_username, EMPTY_TEXT_ELEMENT_DATA).data}`}
                      className="sbi_header_link"
                    >
                      <div className="sbi_header_text sbi_no_bio">
                        <h3>
                        <TextEditable 
                          name={"site_info_instagram_username"}
                          {...this.state.textElementsProps} is_input_text/>
                        </h3>
                      </div>
                      <div
                        className="sbi_header_img"
                      >
                        <div className={"sbi_header_img_hover " + (this.state.edit? "d-none" : "")}>
                          <svg
                            className="sbi_new_logo fa-instagram fa-w-14"
                            aria-hidden="true"
                            data-fa-processed
                            aria-label="Instagram"
                            data-prefix="fab"
                            data-icon="instagram"
                            role="img"
                            viewBox="0 0 448 512"
                          >
                            <path
                              fill="currentColor"
                              d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                            />
                          </svg>
                        </div>
                        <ImageEditable
                          name="site_info_instagram_profile_photo" 
                          alt="ImageStudio.com Webmaster"
                          style={{width: 50, height: 50}}
                          {...this.state.imageElementsProps} />
                      </div>
                    </a>
                  </div>
                  <h5 style={!this.state.edit? {display: "none"} : {}}>
                  <TextEditable 
                    readOnlyBy
                    role={ROLES.admins}
                    name={"instagram_id"}
                    {...this.state.textElementsProps} is_input_text/>
                  </h5>
                  <h5 style={!this.state.edit? {display: "none"} : {}}>
                  <TextEditable 
                    readOnlyBy
                    role={ROLES.admins}
                    name={"instagram_access_token"}
                    {...this.state.textElementsProps} is_input_text/>
                  </h5>
                  <InstaGrid account="jlo" numberOfItems={6} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <HomeFooterIntro
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

export default Home;
