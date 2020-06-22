import React from "react";
import Header from "./Header";
import HeaderImageBanner from "./HeaderImageBanner";
import NavBar from "./NavBar";
import FooterContactUs from "./FooterContactUs";
import Footer from "./Footer";

class SingleWeddingStory extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <HeaderImageBanner />
        <NavBar />
        <section className="story-title">
          <a href="/blog/this-story-title">Wedding in Rome – Irina & Sam</a>
          <div>September 1, 2019 22:00</div>
        </section>
        <section className="stories"></section>
        <section className="row navigators-and-likes">
          <div className="col-12 col-md-6">
            <ul className="breadcrumb">
              <li>
                <a href="/">ImageStudio</a>
              </li>
              <li className="exception">
                <a href="/portfolio/">Stories</a>
              </li>
              <li className="exception">
                <a href="https://taraweddings.ca/portfolio/priya-sid/">
                  Wedding Type
                </a>
              </li>
              <li className="exception">
                <a href="https://taraweddings.ca/portfolio/priya-sid/#">
                  Priya & Sid
                </a>
              </li>
            </ul>
          </div>
          <div className="col-8 col-md-4">
            <a href="#">
              <span>〈</span>
              <span>Previous</span>
            </a>
            <span>|</span>
            <a href="#">
              <span>Next</span>
              <span>〉</span>
            </a>
          </div>
          <div className="col-4 col-md-2">
            <a id="likeButton" href="javascript:void(0);">
              <i className="fa fa-heart" />
            </a>
            <span>941</span>
            <span>likes</span>
          </div>
        </section>
        <FooterContactUs />
        <Footer />
      </div>
    );
  }
}

export default SingleWeddingStory;
