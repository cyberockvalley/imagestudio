import React from "react";
import Header from "./Header";
import HeaderImageBanner from "./HeaderImageBanner";
import NavBar from "./NavBar";
import FooterContactUs from "./FooterContactUs";
import Footer from "./Footer";

class Videos extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <HeaderImageBanner />
        <NavBar />
        <section className="row videos"></section>
        <div className="load-more">
          <button className="load-more">Load More</button>
        </div>
        <FooterContactUs />
        <Footer />
      </div>
    );
  }
}

export default Videos;
