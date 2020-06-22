import React from "react";

class ItemMovie extends React.Component {
  render() {
    return (
      <div className="col-12 col-sm-6 col-md-20p">
        <img
          src="${image}"
          style={{
            width: "100%",
            height: "100%"
          }}
        />
        <div className="btn-center">
          <div className="caption-body">
            <div className="caption-desc">Concept movie</div>
            <div className="caption-title">
              TOYOTA Racing
              <br />
              TS040 HYBRID Launch 2014
            </div>
            <div className="link-captions">
              <a
                href="http://www.youtube.com/watch?v=PV8RfjajnTI&rel=0&autoplay=0"
                className="cbp-lightbox"
                data-title="TOYOTA Racing TS040 HYBRID Launch 2014"
              >
                <i className="rounded-x fa fa-2x fa-play-circle" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemMovie;
