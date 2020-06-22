import React from "react";

class ItemBlogPost extends React.Component {
  render() {
    return (
      <div className="col-12">
        <div className="blog-box">
          <div className="thumb">
            <a href="https://taraweddings.ca/how-wedding-photographer-can-exceed-clients-expectations/">
              <div className="blogPostCover">
                <div>
                  <span className="btn-center blogPostCoverTitle">
                    How wedding photographer can exceed client’s expectations
                  </span>
                </div>
              </div>
              <img src="${image}" alt className="lazy" />
            </a>
          </div>
          <div className="blog-title">
            <div className="row">
              <div className="col-12 col-md-8 col-md-push-4">
                <h4>
                  How wedding photographer can exceed client’s expectations
                </h4>
              </div>
              <div className="col-xs-12 col-md-4 col-md-pull-8">
                <small
                  style={{
                    lineHeight: "3em"
                  }}
                >
                  30.04.2020 | Tips and Tricks
                </small>
              </div>
            </div>
          </div>
          <div className>
            <div className="shortDescription">
              <p>
                Hello guys, this is Paul from Tara weddings and today I want to
                discuss one very interesting question; how a wedding
                photographer can exceed the expectations of a client. Usually
                when bridegroom looking for the wedding photographer, they’re
                looking for the experience and the good photos. So good photos
                is one thing; good photos is […]
              </p>
            </div>
            <div className="text-left">
              <a href="https://taraweddings.ca/how-wedding-photographer-can-exceed-clients-expectations/">
                READ MORE
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemBlogPost;
