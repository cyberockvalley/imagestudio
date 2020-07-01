import React from "react";

class ItemmasonryComment extends React.Component {
  render() {
    return (
      <div className="masonry-comment">
        <img src="${image}" className="d-nones" />
        <div>
          <div className="name">Curly P.</div>
          <div className="date">6/3/2020</div>
          <div className="stars">
            <i className="fa star fa-star" />
            <i className="fa star fa-star" />
            <i className="fa star fa-star" />
            <i className="fa star fa-star" />
            <i className="fa star fa-star" />
          </div>
          <p>
            I did have trouble following the instructions for the action. I
            would love more step-by-step help. It was still fun and the skies
            are gorgeous.
          </p>
          <p></p>
        </div>
      </div>
    );
  }
}

export default ItemmasonryComment;
