import React from "react";

class HomeFooterIntro extends React.Component {
  render() {
    return (
      <div>
        <div
          className="d-none d-sm-block"
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <div className="get-in-touch">
            <h3>Let's get in touch</h3>
            <div>Communication is key</div>
          </div>
        </div>
        <div className="contact-us">
          <div className="col-md-6 d-none d-sm-block">
            <div>
              Choosing your wedding photography and videography crew shouldn’t
              be taken lightly. We understand how important this step is to you
              and we are here to answer any questions you might have.
            </div>
            <div className="contact-info">
              <a href="mailto:info@imagestudio.com">
                <span>info@imagestudio.com </span>
                <i className="fa fa-2x fa-at" />
              </a>
              <a href="https://instagram.com">
                <span>@imagestudio </span>
                <i className="fa fa-2x fa-instagram" />
              </a>
              <a href="tel:+39 644 232 2234">
                <span>+39 644 232 2234 </span>
                <i className="fa fa-2x fa-phone" />
              </a>
            </div>
          </div>
          <div className="col-md-6 footer-form">
            <form className="contact-form d-none d-sm-block">
              <input
                type="text"
                onchange="this.handleChange"
                name="name"
                placeholder="Name"
              />
              <input
                type="text"
                onchange="this.handleChange"
                name="email"
                placeholder="Email"
              />
              <input
                type="text"
                onchange="this.handleChange"
                name="telephone"
                placeholder="Telephone"
              />
              <textarea
                name="message"
                placeholder="Message..."
                defaultValue={""}
              />
              <button type="submit">Send</button>
            </form>
            <div
              className="d-block d-sm-none"
              style={{
                background: "#d6a047",
                padding: "25px",
                height: "auto"
              }}
            >
              <form className="contact-form">
                <div>
                  <h2
                    style={{
                      marginTop: "0px"
                    }}
                  >
                    Get in touch
                  </h2>
                  <span>Tell us about your wedding hopes & dreams</span>
                </div>
                <input
                  type="text"
                  onchange="this.handleChange"
                  name="name"
                  placeholder="Name"
                />
                <input
                  type="text"
                  onchange="this.handleChange"
                  name="email"
                  placeholder="Email"
                />
                <input
                  type="text"
                  onchange="this.handleChange"
                  name="telephone"
                  placeholder="Telephone"
                />
                <textarea
                  name="message"
                  placeholder="Message..."
                  defaultValue={""}
                />
                <button type="submit">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeFooterIntro;
