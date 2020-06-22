import React from "react";

class ItemTeamMember extends React.Component {
  render() {
    return (
      <div className="col-6 col-sm-4 col-md-3">
        <div className="team-member">
          <img
            src="${image}"
            style={{
              height: "100%",
              width: "100%"
            }}
          />
          <div className="desc d-none d-md-block">
            <h4>Paul</h4>
            <h5>Owner, photographer, videographer</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemTeamMember;
