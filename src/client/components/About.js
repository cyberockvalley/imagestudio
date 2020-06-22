import React from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import Footer from "./Footer";

class About extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <NavBar />
        <section className="team-page-header">
          <h3>Image Studio</h3>
          <h3>Weddings from the heart</h3>
        </section>
        <section className="row team-photos"></section>
        <section className="about-us">
          <h2>A little bit about us</h2>
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
          <div
            style={{
              marginTop: "70px"
            }}
          >
            <a className="call-to-action">Let's talk</a>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default About;
