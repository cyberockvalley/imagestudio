import React from "react";

class ItemWeddingStory extends React.Component {
  render() {
    return (
      <div className="col-sm-6 col-md-4 story-container">
        <div
          style={{
            width: "100%",
            height: "100%"
          }}
        >
          <div className="story">
            <a href="https://instagram.com/" target="_blank">
              <img
                style={{
                  width: "100%",
                  minHeight: "100%"
                }}
                src="${image}"
              />
              <div className="fade-box fade-in-down">
                <h2 className="story-title">Matrimonio Ale & Alex</h2>
              </div>
            </a>
            {}
          </div>
        </div>
      </div>
    );
  }
}

export default ItemWeddingStory;
