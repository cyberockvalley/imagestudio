const dateFormat = require('dateformat')
import React from "react";
import HeaderImageBanner from "./HeaderImageBanner";
import { Helmet } from 'react-helmet'
import Page from "./Page";
import EditableStateContext from "./editables/EditableStateContext";
import { lastValueOrThis, truncText, slugify } from "../../both/Functions";
import { EMPTY_TEXT_ELEMENT_DATA } from "./editables/Editable";
import { HTML_DESCRIPTION_LENGTH, SEO_BASE_URL, ROLES } from "../../both/Constants";
import TextEditable from "./editables/TextEditable";
import PageReaction from "./widgets/PageReaction";
import { Link } from "react-router-dom";
import {SHOP_SECTION_ONE_KEY, SHOP_SECTION_TWO_KEY} from "./Shop"

class SingleProductThread extends Page {
  static contextType = EditableStateContext
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.setState({likes: 0})
    if(this.props.threadAdder) this.props.threadAdder(this)
    console.log("SingleProductThread", this.props.match.params.title, this.props)
    this.loadPage([SHOP_SECTION_ONE_KEY, SHOP_SECTION_TWO_KEY], {
      slug: this.props.match.params.title
    })

    
  }

  formatDate = date => {
    //"dddd, mmmm dS, yyyy, h:MM:ss TT" => Saturday, June 9th, 2007, 5:46:21 PM
    //September 1, 2019 22:00
    return dateFormat(date, "mmmm d, yyyy HH:MM")

  }

  increaseLikes = () => {
    this.setState({likes: this.state.likes + 1})
  }

  render() {
    return super.render(
      <>
        <Helmet>
          <title>{this.state.page? this.state.page.get("title") : ""}</title>
          <meta name="description" content={this.state.page? truncText(this.state.page.get("description"), HTML_DESCRIPTION_LENGTH) : ""} />
          <meta name="robots" content="index, follow" />
          <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
          <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
          
          <link rel="canonical" href={this.state.page? `${SEO_BASE_URL + this.state.page.get("slug")}` : ""} />
          
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={this.state.page? this.state.page.get("title") : ""} />
          <meta property="og:description" content={this.state.page? this.state.page.get("description") : ""} />

          <meta property="og:url" content={this.state.page? `${SEO_BASE_URL + this.state.page.get("slug")}` : ""} />
          <meta property="og:site_name" content={this.props.spoolAttributes? this.props.spoolAttributes.site_info_site_name_spaced : ""} />
          <meta property="article:modified_time" content={this.state.page? this.state.page.get("updatedAt") : ""} />
          <meta property="article:section" content="Photography" />
          <meta property="article:tag" content="sharp" />
          <meta property="article:tag" content="nice" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:image" content="https://i1.wp.com/css-tricks.com/wp-content/uploads/2019/10/react-helmet.png?ssl=1" />
          <meta name="twitter:creator" content="@CSS" />
          <meta name="twitter:site" content="@CSS" />
        </Helmet>
        {/*
          <HeaderImageBanner 
          imageEditableProps={{...this.state.imageElementsProps, edit: this.props.edit}} />*/
        }
        <section
          className="row navigators-and-likes"
          style={{
            borderBottom: "none"
          }}
        >
          <div className="col-8">
            <ul className="breadcrumb">
              <li>
                <Link to="/">ImageStudio</Link>
              </li>
              <li className="exception">
                <Link to="/shop/">Packages</Link>
              </li>
              {
                  /*
                  <li className="exception">
                <a href="https://taraweddings.ca/portfolio/priya-sid/">
                  Wedding Type
                </a>
              </li>
                  */
              }
              <li className="exception">
                <Link to={`/${this.props.match.params.title}`} style={{textTransform: "capitalize"}}>
                  {
                    this.props.match.params.title? this.props.match.params.title.replace(/-/g, " ") : ""
                  }
                </Link>
              </li>
            </ul>
          </div>
          <div />
          <div className="col-4">
            <PageReaction info={{type: "like", pageId: this.state.page? this.state.page.id : null}} 
            widget_loading_text="Like button loading..." onValid={this.increaseLikes}>
              <a id="likeButton" href="javascript:void(0);">
                <i className="fa fa-heart" />
              </a>
            </PageReaction>
            <span>{this.state.likes}</span>
            <span>likes</span>
          </div>
        </section>
        <div className="row">
          <section className="row product-view col-11">
            <div className="col-12 col-md-8">
              <img
                src="/imagestudio/images/single-product-image.jpg"
                style={{
                  maxHeight: "600px"
                }}
              />
              <div className="row product-thumbs">
                <div className="col-2 product-thumb">
                  <img src="/imagestudio/images/thum-1.jpg" />
                </div>
                <div className="col-2 product-thumb">
                  <img
                    className="active"
                    src="/imagestudio/images/thum-1.jpg"
                  />
                </div>
                <div className="col-2 product-thumb">
                  <img src="/imagestudio/images/thum-1.jpg" />
                </div>
                <div className="col-2 product-thumb">
                  <img src="/imagestudio/images/thum-1.jpg" />
                </div>
                <div className="col-2 product-thumb">
                  <img src="/imagestudio/images/thum-1.jpg" />
                </div>
                <div className="col-2 product-thumb">
                  <img src="/imagestudio/images/thum-1.jpg" />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 product-details-and-actions">
              <div className="product-details">
                <h1>{this.state.page? this.state.page.get("title") : ""}</h1>
                <div className="product-rating">
                  <div
                    id="purchase_flow_rating"
                    className="star-rating readonly small"
                  >
                    <span className="star svg-star-full" />
                    <span className="star svg-star-full" />
                    <span className="star svg-star-full" />
                    <span className="star svg-star-empty" />
                    <span className="star svg-star-empty" />
                    <a
                      id="purchase_go_to_reviews"
                      className="product-rating-count"
                      href="#reviews_comments"
                      data-module="Purchase"
                      data-track
                    >
                      2 Reviews
                    </a>
                  </div>
                </div>
                <div className="product-shop flex d-none">
                  <div className="shop-info flex-row">
                    <div className="shop-info-details">
                      <div className="shop-info-name">
                        By
                        <a
                          data-module="Purchase"
                          data-tracking="Shop Name"
                          href="/filmcamera_presets"
                        >
                          filmcamera_presets
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div />
              </div>
              <div className="product-actions">
                <div className="license-section">
                  <div className="license-heading flex-row flex-justify-between flex-align-center">
                    <div>
                      <span>License Type</span>
                      <a
                        href="https://creativemarket.com/licenses/general"
                        target="_blank"
                        rel="noreferrer"
                      >
                        What are these?
                      </a>
                    </div>
                    <div className="sp-quantity">
                      <button
                        disabled="disabled"
                        aria-label="Decrease seat Quantity"
                        data-cypress="quantity-selector-decrease"
                        value="dec"
                        className="sp-quantity__button sp-quantity__button--decrease"
                      />
                      <span className="sp-quantity__label">1 seat</span>
                      <button
                        aria-label="Increase seat Quantity"
                        data-cypress="quantity-selector-increase"
                        value="inc"
                        className="sp-quantity__button sp-quantity__button--increase"
                      />
                    </div>
                  </div>
                  <div className="sp-radio-button license-radio-button">
                    <input
                      name="license-radio"
                      id="sp-radio-37801"
                      type="radio"
                      className="sp-radio-button__input"
                      defaultValue={7}
                    />
                    <label
                      htmlFor="sp-radio-37801"
                      className="sp-radio-button__label"
                    >
                      <div className="license-radio-button__container">
                        <div className="license-info-wrap sp-radio-button__label-text">
                          <div>
                            <span className="license-title">Personal</span>
                          </div>
                          <div className="license-price">$49</div>
                        </div>
                      </div>
                    </label>
                  </div>
                  <div className="sp-radio-button license-radio-button">
                    <input
                      name="license-radio"
                      id="sp-radio-16738"
                      type="radio"
                      className="sp-radio-button__input"
                      defaultValue={8}
                    />
                    <label
                      htmlFor="sp-radio-16738"
                      className="sp-radio-button__label"
                    >
                      <div className="license-radio-button__container">
                        <div className="license-info-wrap sp-radio-button__label-text">
                          <div>
                            <span className="license-title">Commercial</span>
                            <span className="label-recommended">
                              recommended
                            </span>
                          </div>
                          <div className="license-price">$59</div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="product-buttons flex-column flex-justify-between align-items-center">
                <button className="primary">Add to cart</button>
                <button className="secondary">Buy it now</button>
                <h3
                  style={{
                    fontSize: "18px",
                    fontFamily: "Lato",
                    textAlign: "center",
                    color: "rgb(33, 43, 54)",
                    lineHeight: "38px",
                    margin: "15px 0px",
                    textTransform: "capitalize"
                  }}
                >
                  Secure Checkout With
                </h3>
                <div className="payment-methods flex-row flex-justify-around">
                  <div>
                    <img src="/imagestudio/images/mastercard_card.svg" />
                  </div>
                  <div>
                    <img src="/imagestudio/images/visa_card.svg" />
                  </div>
                  <div>
                    <img src="/imagestudio/images/american_express_card.svg" />
                  </div>
                  <div>
                    <img src="/imagestudio/images/paypal_card.svg" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <section className="effects-layout row">
          <div className="effect col-11 col-md-8 effect-height-1">
            <img
              src="/imagestudio/images/effect-ice-mountain.jpg"
              style={{
                clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)"
              }}
            />
            <img
              src="/imagestudio/images/effect-ice-mountain-after.jpg"
              style={{
                clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)"
              }}
            />
            <div
              className="slider"
              style={{
                left: "50%"
              }}
            >
              <span className="left-arrow fa fa-arrow-left" />
              <span className="right-arrow fa fa-arrow-right" />
            </div>
          </div>
        </section>
        <section className="product-video-view">
          <div className="col-12 col-sm-9 col-md-8">
            <h2>Great for any video style</h2>
            <p>
              We create and sell great tools for video production in color
              grading, sound design as well as video transitions area. Aim of
              these tools is to save you time and improve your editing
              experience. We have spend countless hours creating all these
              products - so that you do not have to.
            </p>
          </div>
          <div className="effect col-11 effect-height-2">
            <img
              src="/imagestudio/images/effect-ice-mountain.jpg"
              style={{
                clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)"
              }}
            />
            <img
              src="/imagestudio/images/effect-ice-mountain-after.jpg"
              style={{
                clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)"
              }}
            />
            <div
              className="btn-center"
              style={{
                color: "#fff",
                background: "#d8232f",
                borderRadius: "50%",
                width: "60px",
                height: "60px"
              }}
            ></div>
            <div
              className="btn-center"
              style={{
                color: "#fff"
              }}
            >
              <i
                className="fa fa-2x fa-play"
                style={{
                  marginLeft: "7px"
                }}
              />
            </div>
            <div
              data-toggle="modal"
              data-target="#videoModal"
              className="btn-center"
              style={{
                zIndex: 5,
                color: "#fff",
                background: "transparent",
                borderRadius: "50%",
                width: "60px",
                height: "60px"
              }}
            ></div>
            <div id="videoModal" className="modal fade" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">{}</div>
              </div>
            </div>
          </div>
        </section>
        <section className="product-reviews col-12 col-md-11">
          <div
            className="flex-row flex-justify-between reviews-header"
            style={{
              color: "#282828"
            }}
          >
            <div className="summary">
              <span
                style={{
                  margin: "0 10px 10px 0",
                  display: "inline-block"
                }}
                title="4.9"
                className="stars"
              >
                <i className="fa star text-large loox-star fa-star" />
                <i className="fa star text-large loox-star fa-star" />
                <i className="fa star text-large loox-star fa-star" />
                <i className="fa star text-large loox-star fa-star" />
                <i className="fa star text-large loox-star fa-star" />
              </span>
              <span className="summary-text">85 Reviews</span>
            </div>
            <div>
              <button className="btn load-more">Write a review</button>
            </div>
          </div>
          <div className="masonry masonry-col-2 masonry-col-sm-3 masonry-col-md-4 masonry-gap-10" />
        </section>
        <div className="flex-row flex-justify-around">
          <button className="btn load-more">Show more reviews</button>
        </div>
      </>
    );
  }
}

export default SingleProductThread;