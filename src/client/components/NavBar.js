import React from "react";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  render() {
    return (
      <section id="navigation">
        <div id="main-navigaton" className="navbar-static-top">
          <div className="container">
            <nav className="navbar navbar-expand-xl p-0">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#main-nav"
                aria-controls
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="ellipsis-h"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="svg-inline--fa fa-ellipsis-h fa-w-16 fa-5x"
                >
                  <path
                    fill="currentColor"
                    d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
                    className
                  />
                </svg>
              </button>
              <div id="main-nav" className="collapse navbar-collapse">
                <ul id="menu-upper" className="navbar-nav">
                  <li
                    id="menu-item-4601"
                    className="nav-item menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-36 current_page_item menu-item-4601 active"
                  >
                    <Link
                      title="Home"
                      to="/"
                      className="nav-link"
                    >
                      Home
                    </Link>
                  </li>
                  <li
                    id="menu-item-4597"
                    className="nav-item menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-4597 dropdown"
                  >
                    <Link
                      title="Photography"
                      to="#"
                      data-toggle="dropdown"
                      className="dropdown-toggle nav-link"
                      aria-haspopup="true"
                    >
                      Photography <span className="caret" />
                    </Link>
                    <ul role="menu" className=" dropdown-menu">
                      <li
                        id="menu-item-4600"
                        className="nav-item menu-item menu-item-type-post_type menu-item-object-portfolio menu-item-4600"
                      >
                        <Link
                          title="Weddings"
                          to="/portfolio/"
                          className="dropdown-item"
                        >
                          Weddings
                        </Link>
                      </li>
                      <li
                        id="menu-item-4751"
                        className="nav-item menu-item menu-item-type-custom menu-item-object-custom menu-item-4751"
                      >
                        <Link
                          title="Full Stories"
                          to="/portfolio/stories"
                          className="dropdown-item"
                        >
                          Full Stories
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    id="menu-item-4598"
                    className="nav-item menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-4597 dropdown"
                  >
                    <Link
                      title="Videography"
                      to="#"
                      data-toggle="dropdown"
                      className="dropdown-toggle nav-link"
                      aria-haspopup="true"
                    >
                      Videography <span className="caret" />
                    </Link>
                    <ul role="menu" className=" dropdown-menu">
                      <li
                        id="menu-item-4600"
                        className="nav-item menu-item menu-item-type-post_type menu-item-object-portfolio menu-item-4600"
                      >
                        <Link
                          title="Weddings"
                          to="/videos/"
                          className="dropdown-item"
                        >
                          Weddings
                        </Link>
                      </li>
                      <li
                        id="menu-item-4599"
                        className="nav-item menu-item menu-item-type-post_type menu-item-object-portfolio menu-item-4599"
                      >
                        <Link
                          title="Music"
                          to="/videos/music/"
                          className="dropdown-item"
                        >
                          Music
                        </Link>
                      </li>
                      <li
                        id="menu-item-4751"
                        className="nav-item menu-item menu-item-type-custom menu-item-object-custom menu-item-4751"
                      >
                        <Link
                          title="Commercial"
                          to="/videos/commercial/"
                          className="dropdown-item"
                        >
                          Commercial
                        </Link>
                      </li>
                      <li
                        id="menu-item-4751"
                        className="nav-item menu-item menu-item-type-custom menu-item-object-custom menu-item-4751"
                      >
                        <Link
                          title="Commercial"
                          to="/movies/"
                          className="dropdown-item"
                        >
                          Movies
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    id="menu-item-4596"
                    className="nav-item menu-item menu-item-type-post_type menu-item-object-page menu-item-4596"
                  >
                    <Link
                      title="Packages"
                      to="/packages/"
                      className="nav-link"
                    >
                      Packages
                    </Link>
                  </li>
                  <li
                    id="menu-item-4593"
                    className="nav-item menu-item menu-item-type-post_type menu-item-object-page menu-item-4593"
                  >
                    <Link
                      title="Blog"
                      to="/blog/"
                      className="nav-link"
                    >
                      Blog
                    </Link>
                  </li>
                  <li
                    id="menu-item-4592"
                    className="nav-item menu-item menu-item-type-post_type menu-item-object-page menu-item-4592"
                  >
                    <Link
                      title="About"
                      to="/about/"
                      className="nav-link"
                    >
                      About
                    </Link>
                  </li>
                  <li
                    id="menu-item-4594"
                    className="nav-item menu-item menu-item-type-post_type menu-item-object-page menu-item-4594"
                  >
                    <Link
                      title="Contact"
                      to="/contact/"
                      className="nav-link"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </section>
    );
  }
}

export default NavBar;
