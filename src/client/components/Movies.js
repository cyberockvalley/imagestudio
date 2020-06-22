import React from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import FooterContactUs from "./FooterContactUs";
import Footer from "./Footer";

class Movies extends React.Component {
  render() {
    return (
      <div>
        <Header />
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
                className="movie-big-picture"
                style={{
                  backgroundImage: "url(images/768x432.png)"
                }}
              />
            </div>
            <div className="d-md-none col-12 col-md-3 flex-column">
              <div />
              <div className="movie-more-about-us">
                <a href>More about our work</a>
              </div>
            </div>
            <img
              className="d-none d-md-block"
              style={{
                position: "absolute",
                top: -50,
                left: "50px",
                width: "35%",
                height: "80%"
              }}
              src="images/4-Mark-and-Sarah-Wedding-in-Umbria-Paola-Simonelli-italian-wedding-photographer-wedding-in-Italy-4333-760x510.jpg"
            />
          </section>
        </div>
        <div
          className="row"
          style={{
            background: "#222",
            padding: "15px"
          }}
        >
          <section className="row col-12 movies w-margin-auto"></section>
        </div>
        <section className="about-us movie-about-us">
          <h2>Art of being a wedding photographer </h2>
          <p>
            Tara Weddings was founded by a happily married couple, who started
            their career in fine arts and photography and decided to dedicate
            their lives to what they love most. Their passion towards beautiful
            images, life-long memories and people’s happiness was the key. Years
            of practice and experience brought them towards the establishment of
            their own company – Tara Weddings. Tara means “Star” in Sanskrit. It
            represents their goal – to make every couple feel special on their
            Wedding Day. High quality services, top notch equipment, enthusiasm
            and a world of ideas secured them a spot among Toronto’s best
            wedding photography and videography companies.
            <a href="test-link">Test Link</a>
          </p>
        </section>
        <FooterContactUs />
        <Footer />
      </div>
    );
  }
}

export default Movies;
