import React from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import FooterContactUs from "./FooterContactUs";
import Footer from "./Footer";

class Blog extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <NavBar />
        <section className="row blog-thread">
          <div className="col-sm-9">
            <div className="blog-list"></div>
            <div className="load-more">
              <button className="load-more">Load More</button>
            </div>
          </div>
          <div className="col-sm-3 about-blog">
            <div className="blogTitle">
              <h4>Our Blog</h4>
            </div>
            <div>
              <p
                style={{
                  fontSize: "14px",
                  textAlign: "justify"
                }}
              >
                We are passionate about the industry we take part in, and we
                know well enough, how foreign it looks to our clients. Wedding
                photography and videography is way more complex than just
                pressing a button, and we would like to introduce you to all the
                little details that usually stay behind the stage.
              </p>
              <p
                style={{
                  fontSize: "14px",
                  textAlign: "justify"
                }}
              >
                In this blog you will also find some useful tips on how to
                contribute to the process from your end, which surely will
                elevate the pictures beyond all your expectations. Aspiring
                photographers can also find an abundance of information here.
              </p>
              <p
                style={{
                  fontSize: "14px",
                  textAlign: "justify"
                }}
              >
                Welcome!
              </p>
            </div>
          </div>
        </section>
        <FooterContactUs />
        <Footer />
      </div>
    );
  }
}

export default Blog;
