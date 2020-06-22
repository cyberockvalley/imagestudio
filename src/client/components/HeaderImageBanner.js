import React from "react";

class HeaderImageBanner extends React.Component {
  render() {
    return (
      <section
        id="intro"
        style={{
          overflow: "hidden"
        }}
      >
        <div
          id="introImageDesktop"
          className="d-none d-lg-block"
          style={{
            backgroundImage: "url(/imagestudio/images/1920x1280.png)",
            height: "88vh",
            width: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        <div id="introImageMobile" className="d-block d-lg-none">
          <img src="/imagestudio/images/768x432.png" alt />
        </div>
      </section>
    );
  }
}

export default HeaderImageBanner;
