import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import HomeFooterIntro from "./HomeFooterIntro";
import HeaderVideoBanner from "./HeaderVideoBanner";
import NavBar from "./NavBar";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <HeaderVideoBanner />
        <NavBar />
        <div className="flo-block__container">
          <div className="flo-image-block-1 flo-image-block-1--244">
            <div className="flo-image-block-1__top-wrap">
              <h2 className="flo-image-block-1__title col-md-6">
                Art of being a wedding photographer
              </h2>
              <div className="flo-image-block-1__text-content col-md-6">
                <p>
                  Still Miracle London Photography Studio is famous throughout
                  the UK and far beyond its borders for its unique approach
                  which blends together creativity, romance, natural
                  storytelling and reportage style.
                </p>
              </div>
            </div>
          </div>
        </div>
        <section className="mansory mansory-col-2 mansory-col-sm-3 mansory-gap-10"></section>
        <section className="home-instagram" id="home-instagram">
          <div className="home-instagram__inner">
            <div className="section-inner">
              <div className="col-12">
                <div
                  className="title wow slideInUp  animated"
                  style={{
                    visibility: "visible",
                    animationName: "slideInUp"
                  }}
                >
                  <div className="title__inner">My instagram</div>
                </div>
                <a
                  href="https://www.instagram.com/wedlifer/"
                  className="social_link wow slideInUp  animated"
                  style={{
                    visibility: "visible",
                    animationName: "slideInUp"
                  }}
                >
                  <i className="fa fa-instagram" />
                </a>
                <div
                  id="sb_instagram"
                  className="sbi sbi_col_3  sbi_width_resp"
                  style={{
                    paddingBottom: "20px",
                    width: "100%"
                  }}
                  data-feedid="sbi_17841403582625027#6"
                  data-res="auto"
                  data-cols={3}
                  data-num={6}
                  data-shortcode-atts="{}"
                  data-sbi-index={1}
                >
                  <div
                    className="sb_instagram_header "
                    style={{
                      padding: "10px",
                      paddingBottom: 0
                    }}
                  >
                    <a
                      href="https://www.instagram.com/wedlifer"
                      target="_blank"
                      rel="noopener"
                      title="@wedlifer"
                      className="sbi_header_link"
                    >
                      <div className="sbi_header_text sbi_no_bio">
                        <h3>wedlifer</h3>
                      </div>
                      <div
                        className="sbi_header_img"
                        data-avatar-url="http://wedlifer.com/wp-content/uploads/sb-instagram-feed-images/wedlifer.jpg"
                      >
                        <div className="sbi_header_img_hover">
                          <svg
                            className="sbi_new_logo fa-instagram fa-w-14"
                            aria-hidden="true"
                            data-fa-processed
                            aria-label="Instagram"
                            data-prefix="fab"
                            data-icon="instagram"
                            role="img"
                            viewBox="0 0 448 512"
                          >
                            <path
                              fill="currentColor"
                              d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                            />
                          </svg>
                        </div>
                        <img
                          src="images/wedlifer.jpg"
                          alt
                          width={50}
                          height={50}
                        />
                      </div>
                    </a>
                  </div>
                  <div className="instagram-images"></div>
                  <div id="sbi_load" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <HomeFooterIntro />
        <Footer />
      </div>
    );
  }
}

export default Home;
