import React from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import FooterContactUs from "./FooterContactUs";
import Footer from "./Footer";

class Shop extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <NavBar />
        <section className="row">
          <div className="shop-view col-12 col-sm-9 col-md-8">
            <div>
              <div className="shop-title">Premier Pro</div>
              <div className="row shop-1"></div>
            </div>
            <div>
              <div className="shop-title">Online workshop for you</div>
              <div className="row shop-2"></div>
            </div>
          </div>
        </section>
        <FooterContactUs />
        <Footer />
      </div>
    );
  }
}

export default Shop;
