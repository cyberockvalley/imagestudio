import React from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import Footer from "./Footer";

class Contact extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <NavBar />
        <section
          className="row"
          style={{
            marginTop: "50px"
          }}
        >
          <div className="col-11 col-md-10 w-margin-auto">
            <div className="row">
              <div className="col-sm-7">
                <div className="row">
                  <div className="col-md-6 text-miracle">
                    <h2 className="miracle-title">Get in touch</h2>
                    <h3 className="miracle-body">
                      <p>Based in London, available worldwide.</p>
                      <p>
                        email: diana@stillmiracle.com
                        <br /> tel. +44 75 265 36211
                      </p>
                    </h3>
                  </div>
                  <div className="col-md-6 d-none d-md-block">
                    <div className="contact-info align-items-start">
                      <a href="mailto:info@imagestudio.com">
                        <i className="fa fa-2x fa-at" />
                        <span>info@imagestudio.com </span>
                      </a>
                      <a href="https://instagram.com">
                        <i className="fa fa-2x fa-instagram" />
                        <span>@imagestudio </span>
                      </a>
                      <a href="tel:+39 644 232 2234">
                        <i className="fa fa-2x fa-phone" />
                        <span>+39 644 232 2234 </span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <form className="contact-form all col-12 w-margin-auto">
                    <input
                      type="text"
                      onchange="this.handleChange"
                      name="name"
                      placeholder="NAME"
                    />
                    <input
                      type="text"
                      onchange="this.handleChange"
                      name="email"
                      placeholder="YOUR EMAIL"
                    />
                    <textarea
                      name="message"
                      placeholder="DAY / EVENT / IDEAS..."
                      defaultValue={""}
                    />
                    <button
                      type="submit"
                      style={{
                        marginTop: "25px",
                        alignSelf: "center"
                      }}
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-sm-5">
                <img src="images/contact-woman.png" className="contact-photo" />
                <div
                  className="angle-line angle-135"
                  style={{
                    position: "absolute"
                  }}
                />
              </div>
            </div>
            <div
              className="row"
              style={{
                margin: "50px 0px !important",
                padding: "0px !important"
              }}
            >
              <div
                className="col-sm-8"
                style={{
                  height: "247px",
                  padding: "10px"
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5938.98072352206!2d12.447683825393748!3d41.903816266880455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f60660c3e3925%3A0x498c3835506c3c!2s00120%20Vatican%20City!5e0!3m2!1sen!2sng!4v1592743883321!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  frameBorder={0}
                  style={{
                    border: 0
                  }}
                  allowFullScreen
                />
              </div>
              <div
                className="col-sm-4 "
                style={{
                  height: "247px",
                  padding: "10px"
                }}
              >
                <img src="images/map-image.jpg" className="h-margin-auto" />
              </div>
            </div>
            <div
              className="row d-md-none"
              style={{
                padding: "0px !important",
                margin: "0px !important"
              }}
            >
              <div
                className="col-12"
                style={{
                  padding: "0px !important",
                  margin: "0px !important"
                }}
              >
                <div className="contact-info align-items-start d-md-nones">
                  <a href="mailto:info@imagestudio.com">
                    <i className="fa fa-2x fa-at" />
                    <span>info@imagestudio.com </span>
                  </a>
                  <a href="https://instagram.com">
                    <i className="fa fa-2x fa-instagram" />
                    <span>@imagestudio </span>
                  </a>
                  <a href="tel:+39 644 232 2234">
                    <i className="fa fa-2x fa-phone" />
                    <span>+39 644 232 2234 </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Contact;
