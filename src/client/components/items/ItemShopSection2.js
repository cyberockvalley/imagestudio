import React from "react";

class ItemShopSection2 extends React.Component {
  render() {
    return (
      <div className="col-6 col-sm-4 col-md-3">
        <a
          href="/collections/video-pro-lut-collections/products/action"
          className="product-card"
        >
          <div className="product-card__image-container">
            <div className="product-card__image-wrapper">
              <div
                className="product-card__image js"
                style={{
                  maxWidth: "235px"
                }}
                data-image-id={6915995140184}
              >
                <div
                  style={{
                    paddingTop: "66.66666666666666%"
                  }}
                >
                  <img
                    src="${image}"
                    alt="Action"
                    className="product-card__image"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="product-card__info">
            <div className="product-card__name">Product name</div>
            <div className="product-card__price">
              <span className="visually-hidden">Regular price</span>
              $19
            </div>
          </div>
          <div className="product-card__overlay d-none d-md-block">
            <span className="btn product-card__overlay-btn ">View</span>
            <span
              className="htusb-ui-boost htusb-ui-coll-boost"
              data-v1={1996855836760}
              data-v2="action"
              data-v3
              data-v4
            ></span>
          </div>
        </a>
      </div>
    );
  }
}

export default ItemShopSection2;
