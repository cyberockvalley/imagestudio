const dateFormat = require('dateformat')
import React from "react";
import HeaderImageBanner from "./HeaderImageBanner";
import { Helmet } from 'react-helmet'
import Page from "./Page";
import EditableStateContext from "./editables/EditableStateContext";
import { lastValueOrThis, truncText, slugify, isClient } from "../../both/Functions";
import { EMPTY_TEXT_ELEMENT_DATA } from "./editables/Editable";
import { HTML_DESCRIPTION_LENGTH, SEO_BASE_URL, ROLES } from "../../both/Constants";
import TextEditable from "./editables/TextEditable";
import PageReaction from "./widgets/PageReaction";
import { Link } from "react-router-dom";
import {SHOP_SECTION_ONE_KEY, SHOP_SECTION_TWO_KEY} from "./Shop"
import ImageEditable from "./editables/ImageEditable";
import ListEditable from "./editables/ListEditable";
import ItemEffectExample from "./items/ItemEffectExample";
import { IFRAME_STYLES } from "./widgets/IframeView";
import ItemMansoryComment from './items/ItemMansoryComment'

export const getCart = () => {
  if(!isClient()) return {}
  var cart = window.localStorage.getItem("cart")
  return cart? JSON.parse(cart) : {}
}

export const LICENSES = {
  personal: 0,
  commercial : 1
}
class SingleProductThread extends Page {
  static contextType = EditableStateContext
  constructor(props) {
    super(props)
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this)
  }

  componentDidMount() {
    this.initCart()
    this.setState({inCart: this.inCart(), likes: 0})
    if(this.props.threadAdder) this.props.threadAdder(this)
    console.log("SingleProductThread", this.props.match.params.title, this.props)
    this.loadPage([SHOP_SECTION_ONE_KEY, SHOP_SECTION_TWO_KEY], {
      slug: this.props.match.params.title
    })
    
  }

  getSlug = () => {
    return this.props.match.params.title
  }

  formatDate = date => {
    //"dddd, mmmm dS, yyyy, h:MM:ss TT" => Saturday, June 9th, 2007, 5:46:21 PM
    //September 1, 2019 22:00
    return dateFormat(date, "mmmm d, yyyy HH:MM")

  }

  increaseLikes = () => {
    this.setState({likes: this.state.likes + 1})
  }

  effectExamplesRef = effectExamplesList => {
    this.effectExamplesList = effectExamplesList
    
  }

  handleEffectExamplesLoadMore = e => {
    if(this.effectExamplesList && !this.state.effectExamplesLoading) {
      this.setState({effectExamplesLoading: true})
      this.effectExamplesList.more(info => {
        //onLoaded
        this.setState({
          effectExamplesLoading: false,
          effectExamplesHasNext: info.has_next,
          effectExamplesHasPrev: info.has_prev
        })
      }, error => {
        //onFailed
        this.setState({effectExamplesLoading: false})
      })
    }
  }

  buildEffectExamplesItem = (item, index, onBuildItemName, refGetter) => {
    return (
      <ItemEffectExample 
        key={index}
        index={index}
        page={item}
        onBuildItemName={onBuildItemName}
        refGetter={refGetter} />
    )
  }

  toggleIframeModal = () => {
    console.log("toggleIframeModal", !this.state.toggleIframeModal)
    this.setState({toggleIframeModal: !this.state.toggleIframeModal})
  }
  

  initCart = () => {
    var cart = getCart()
    this.setState({
      product: cart[this.getId()]? cart[this.getId()] : this.getInitCartProduct()
    })
  }

  updateCart = () => {
    var cart = getCart()
    cart[this.getId()] = this.state.product
    window.localStorage.setItem("cart", JSON.stringify(cart))
    if(this.props.onCartUpdate) this.props.onCartUpdate()
  }

  getInitCartProduct = () => {
    var id = this.getId();
    var name = "ddd";
    var license = LICENSES.personal;
    var price = 45;
    var seats = 1;
    return {
      id: id,
      name: name,
      license_type: license,
      price: price,
      seats: seats
    }
  }

  toggleCart = () => {
    if(this.inCart()) {
      this.removeFromCart()

    } else {
      this.addToCart()
    }
  }

  addToCart = () => {
    this.updateCart()
    this.setState({inCart: true})
  }

  removeFromCart = () => {
    var cart = getCart()
    delete cart[this.getId()]
    window.localStorage.setItem("cart", JSON.stringify(cart))
    this.setState({inCart: false})
    if(this.props.onCartUpdate) this.props.onCartUpdate()
  }

  buy = () => {
    this.props.history.push("/shop/cart")
  }

  inCart = () => {
    var cart = getCart()
    console.log("inCart", cart && cart.hasOwnProperty(this.getId()), cart)
    return cart && cart.hasOwnProperty(this.getId())
  }

  increaseSeat = () => {
    var product = this.state.product
    product.seats++
    this.setState({product: product})
    if(this.inCart()) this.updateCart()
  }

  decreaseSeat = () => {
    var product = this.state.product
    if(product.seats - 1 > 0) {
      product.seats--
      this.setState({product: product})
      if(this.inCart()) this.updateCart()
    }
  }

  getId = () => {
    return "aa"
  }

  handleCheckBoxChange = e => {
    var product = this.state.product
    var type = parseInt(e.target.getAttribute("dataType"))
    console.log("DATA_TYPE", type)
    if(type == product.license_type) return
    product.license_type = type
    this.setState({product: product})
    if(this.inCart()) this.updateCart()
  }

  commentsRef = commentsList => {
    this.commentsList = commentsList
    
  }

  handleCommentsLoadMore = e => {
    if(this.commentsList && !this.state.commentsLoading) {
      this.setState({commentsLoading: true})
      this.commentsList.more(info => {
        //onLoaded
        this.setState({
          commentsLoading: false,
          commentsHasNext: info.has_next,
          commentsHasPrev: info.has_prev
        })
      }, error => {
        //onFailed
        this.setState({commentsLoading: false})
      })
    }
  }

  buildCommentsItem = (item, index, onBuildItemName, refGetter, edit) => {
    return (
      <ItemMansoryComment
        key={index}
        index={index}
        page={item}
        onBuildItemName={onBuildItemName}
        refGetter={refGetter}
        edit={edit} />
    )
  }

  toggleAddComment = () => {
    //var addComment = this.state.addComment? false : true
    //this.state.addComment = addComment
    //this.setState({addComment: addComment})
    //if(addComment) 
    this.commentsList.addNew(null, true)
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
            <div className="col-12 col-md-8" style={{
                  height: "600px"
                }}>
              <ImageEditable
                    isPointer
                    role={ROLES.mod}
                    name="featured_image"
                    {...this.state.imageElementsProps}
                    edit={this.context.edit}
                    spinnerWidth={50}
                    spinnerHeight={50}
                    spinnerThickness={7}
                    spinnerRunnerColor="#f33"
                    style={{
                      width: "100%",
                      height: "100%",
                      minHeight: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0
                    }}
                    add_overlay={!this.state.page || !this.state.page.id || this.context.edit}
                  />
                  {/*
              <div className="row product-thumbs">
                <div className="col-2 product-thumb">
                <ImageEditable
                    isPointer
                    role={ROLES.mod}
                    name="featured_image"
                    {...this.state.imageElementsProps}
                    edit={this.context.edit}
                    spinnerWidth={50}
                    spinnerHeight={50}
                    spinnerThickness={7}
                    spinnerRunnerColor="#f33"
                    style={{
                      width: "100%",
                      height: "100%",
                      minHeight: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0
                    }}
                    add_overlay={!this.state.page || !this.state.page.id || this.context.edit}
                  />
                </div>
                <div className="col-2 product-thumb">
                  <ImageEditable 
                      name="video_overlay"
                      id="video_overlay"
                      {...this.state.imageElementsProps}
                      edit={this.context.edit}
                      spinnerWidth={50}
                      spinnerHeight={50}
                      spinnerThickness={7}
                      spinnerRunnerColor="#f33"
                      className="active"
                      style={{
                        height: "100%",
                        width: "100%"
                      }}
                      emptyWidth="100%"
                      emptyHeight="100%"
                      add_overlay={this.context.edit? true : false} />
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
              */}
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
                      <span>License Type </span>
                      <a
                        href="https://creativemarket.com/licenses/general"
                        target="_blank"
                        rel="noreferrer"
                        className="d-none"
                      >
                        What are these?
                      </a>
                    </div>
                    <div className="sp-quantity">
                      <button
                        onClick={this.decreaseSeat}
                        disabled={!this.state.product || this.state.product.seats == 1? true : false}
                        aria-label="Decrease seat Quantity"
                        data-cypress="quantity-selector-decrease"
                        value="dec"
                        className="sp-quantity__button sp-quantity__button--decrease"
                      />
                      <span className="sp-quantity__label">{this.state.product && this.state.product.seats > 1? this.state.product.seats + " seats" :  "1 seat"}</span>
                      <button
                        onClick={this.increaseSeat}
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
                      dataType={LICENSES.personal}
                      onChange={this.handleCheckBoxChange}
                      checked={!this.state.product? false : this.state.product.license_type == LICENSES.personal}
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
                          <div className="license-price">
                            $
                            <TextEditable 
                              role={ROLES.mod}
                              name="price"
                              placeholder="Price..."
                              {...this.state.textElementsProps}
                              edit={this.props.edit} 
                              is_input_text />
                          </div>
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
                      dataType={LICENSES.commercial}
                      onChange={this.handleCheckBoxChange}
                      checked={!this.state.product? false : this.state.product.license_type == LICENSES.commercial}
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
                          <div className="license-price">
                            $
                            <TextEditable 
                              role={ROLES.mod}
                              name="price_commercial"
                              placeholder="Commercial Price..."
                              {...this.state.textElementsProps}
                              edit={this.props.edit}
                              is_input_text /></div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="product-buttons flex-column flex-justify-between align-items-center">
                <button className="primary" onClick={this.toggleCart}>{this.state.inCart? "Remove from" : "Add to"} cart</button>
                <button className="secondary" onClick={this.buy}>Buy it now</button>
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
        <ListEditable 
          requestPageMetasOnNewItem={false}
          role={ROLES.mod}
          className="effects-layout row"
          name={`site_content_product_${this.getSlug()}_effects`}
          onBuildItemName={(index, name) => {
            return `site_content_product_${this.getSlug()}_effects_${index}${name}`
          }}
          readableName="Effect examples"
          itemReadableName="Effect example"
          {...this.state.listElementsProps}
          rowsPerPage={5}
          privateRef={this.effectExamplesRef}
          onItem={this.buildEffectExamplesItem}
          itemDraggable={true}
          onItemsLoaded = {
            info => {
            this.setState({
              effectExamplesHasNext: info.has_next
            })}
          }
        />
        <div className="load-more">
          <button onClick={this.handleEffectsLoadMore} className={"load-more " + (this.state.effectsLoading? "loading " : "") + (this.state.effectsHasNext? "" : "d-none")}>
            <span>Load More</span>
          </button>
        </div>
        <section className="product-video-view">
          <div className="col-12 col-sm-9 col-md-8">
            <h2>
              <TextEditable 
                role={ROLES.mod}
                name="global_heading"
                placeholder="Global heading..."
                {...this.props.spoolElementsProps.texts}
                edit={this.props.edit} 
                is_input_text />
            </h2>
            <p>
              <TextEditable 
                role={ROLES.mod}
                name="global_description"
                placeholder="Global description..."
                {...this.props.spoolElementsProps.texts}
                edit={this.props.edit} />
            </p>
          </div>
          <div className="effect col-11 effect-height-2">
            <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "column"}}>
              <TextEditable 
                isIframe
                iframeOptions={{
                  autoPlay: false,
                  showIframe: !this.context.edit && this.state.toggleIframeModal,
                  iframeStyle: IFRAME_STYLES.modal,
                  onModalClose: this.toggleIframeModal
                }}
                role={ROLES.mod}
                name="video_iframe_src"
                id="video_iframe_src"
                placeholder="Enter youtube video id..."
                {...this.state.textElementsProps}
                edit={this.context.edit} 
                is_input_text />
              <ImageEditable 
                name="video_overlay"
                id="video_overlay"
                {...this.state.imageElementsProps}
                edit={this.context.edit}
                spinnerWidth={50}
                spinnerHeight={50}
                spinnerThickness={7}
                spinnerRunnerColor="#f33"
                style={{
                  height: "100%",
                  width: "100%"
                }}
                emptyWidth="100%"
                emptyHeight="100%"
                add_overlay={true} />
            </div>
            <div
              onClick={this.toggleIframeModal}
              className="btn-center action"
              style={{
                color: "#fff",
                background: "#d8232f",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                zIndex: 1
              }}
            >
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
            </div>
          </div>
        </section>
        <section id="reviews_comments" className="product-reviews col-12 col-md-11">
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
              <button className="btn load-more" onClick={this.toggleAddComment}>Write a review</button>
            </div>
          </div>
          <ListEditable 
              requestPageMetasOnNewItem={false}
              className="masonry masonry-col-2 masonry-col-sm-3 masonry-col-md-4 masonry-gap-10"
              role={ROLES.anonymous}
              name={`anonymous_comments_${this.getSlug()}`}
              onBuildItemName={(index, name) => {
                return `anonymous_comment_${this.getSlug()}_${index}${name}`
              }}
              readableName="Reviews"
              itemReadableName="Review"
              {...this.state.listElementsProps}
              rowsPerPage={5}
              privateRef={this.commentsRef}
              onItem={this.buildCommentsItem}
              onItemsLoaded = {
                info => {
                this.setState({
                  commentsHasNext: info.has_next
                })}
              }
              hideInfo
              hideAddButton
          />
          <div className="flex-row flex-justify-around">
            <div className="load-more">
              <button onClick={this.handleCommentsLoadMore} className={"load-more " + (this.state.commentsLoading? "loading " : "") + (this.state.commentsHasNext? "" : "d-none")}>
                <span>Show more reviews</span>
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default SingleProductThread;