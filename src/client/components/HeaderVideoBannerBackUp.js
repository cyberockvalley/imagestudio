import React from "react";

class HeaderVideoBanner extends React.Component {
  render() {
    return (
      <section
        id="intro"
        style={{
          overflow: "hidden"
        }}
      >
        <div
          id="introVideoDesktop"
          className="d-none d-lg-block"
          style={{
            position: "relative",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            height: "100%",
            backgroundSize: "51%"
          }}
        >
          <iframe
            src="/imagestudio/videos/intro2.mp4"
            allow="autoplay; fullscreen"
            allowFullScreen
            width={1366}
            height="768.375"
            frameBorder={0}
          />
        </div>
        <div
          id="introVideoMobile"
          className="d-block d-lg-none"
          style={{
            position: "relative",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            backgroundSize: "51%",
            backgroundColor: "#000"
          }}
        ></div>
      </section>
    );
  }
}

export default HeaderVideoBanner;
