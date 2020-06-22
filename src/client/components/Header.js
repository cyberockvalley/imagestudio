import React from "react";

class Header extends React.Component {
  render() {
    return (
      <header id="header">
        <div id="top-panel">
          <div className="container">
            <div className="row">
              <div className="col-11 col-sm-11 col-md-6 col-xl-6">
                <h1>Wedding Photographer and Videographer</h1>
              </div>
              <div className="col-4 col-sm-11 col-md-3 col-xl-3">
                +1(888)699-9443
              </div>
              <div className="col-6 col-sm-11 col-md-3 col-xl-3">
                info@taraweddings.ca{" "}
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
