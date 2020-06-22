import React from "react";

class FooterContactUs extends React.Component {
  render() {
    return (
      <div className="contact-us">
        <div className="col-md-6">
          <div
            style={{
              margin: "0px"
            }}
          />
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
        <div
          className="col-md-6"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "end"
          }}
        >
          <div
            style={{
              margin: "15px 0px"
            }}
          >
            <div
              style={{
                margin: "auto 0px"
              }}
            >
              Choosing your wedding photography and videography crew shouldn’t
              be taken lightly. We understand how important this step is to you
              and we are here to answer any questions you might have.{" "}
            </div>
            <a
              className="call-to-action"
              style={{
                display: "inline-block",
                height: "auto",
                marginTop: "70px"
              }}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default FooterContactUs;
