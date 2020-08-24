import React from "react";
import Header from "./Header";
import HeaderImageBanner from "./HeaderImageBanner";
import NavBar from "./NavBar";
import FooterContactUs from "./FooterContactUs";
import Footer from "./Footer";

class Reviews extends React.Component {
  render() {
    return (
      <div>
        <Header history={this.props.history}/>
        <HeaderImageBanner />
        <NavBar />
        <div className="row">
          <div
            className="col-12 col-sm-11 col-md-10 w-margin-auto"
            style={{
              marginTop: "50px"
            }}
          >
            <section
              data-aos="fade-up-right"
              className="flex-row flex-justify-between"
              style={{
                margin: "25px auto"
              }}
            >
              <div
                style={{
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  fontSize: "18px"
                }}
              >
                Reviews
              </div>
              <button className="load-more text-center">Write a review</button>
            </section>
            <section className="reviews"></section>
          </div>
        </div>
        <div className="load-more">
          <button className="load-more">Load More</button>
        </div>
        <FooterContactUs />
        <Footer />
      </div>
    );
  }
}

export default Reviews;
