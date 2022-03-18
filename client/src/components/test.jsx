import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { inject } from "mobx-react";
import Dashboard from "./Dashboard";

@inject("authStore")
class Test extends Component {
  navContainer = React.createRef(null);
  state = {
    isVisble: false,
    render: false,
  };

  callBackFunction = (entries) => {
    const [entry] = entries;
    this.setState({
      ...this.state,
      isVisble: !entry.isIntersecting,
    });
  };

  optionsFunc = () => {
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: [0.0, 1.0],
    };
    return options;
  };

  componentDidMount() {
    const observer = new IntersectionObserver(
      this.callBackFunction,
      this.optionsFunc
    );
    if (this.navContainer.current) {
      observer.observe(this.navContainer.current);
    }
    // this.props.post.getPosts();
  }
  render() {
    const token = localStorage.getItem("user_token");

    if (token) {
      this.props.authStore.verifyTokenValidity(token);
    } else {
      return <Redirect to="/login" />;
    }

    console.log(this.props, "shitt happens");
    return (
      <div className="main--container">
        <div className="navbar-custom__container" ref={this.navContainer}>
          <div
            className={`navbar-custom ${
              this.state.isVisble ? "navbar-custom__active" : ""
            }`}
          >
            <ul className="navbar-links__container container">
              <li className="navbar-link">
                <div className="logo">
                  <em>
                    Blog{" "}
                    {console.log(this.state.isVisble ? "hell yeah" : "hell no")}
                  </em>
                </div>
              </li>
              <li className="navbar-link">
                <div className="mr-2">
                  <svg
                    width="13"
                    height="16"
                    viewBox="0 0 16 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 20C9.1 20 10 19.1 10 18H6C6 19.1 6.89 20 8 20ZM14 14V9C14 5.93 12.36 3.36 9.5 2.68V2C9.5 1.17 8.83 0.5 8 0.5C7.17 0.5 6.5 1.17 6.5 2V2.68C3.63 3.36 2 5.92 2 9V14L0 16V17H16V16L14 14Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </li>

              <li className="navbar-link dropdown">
                <div
                  className="avatar dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-expanded="false"
                ></div>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <Link key="create-post" className="dropdown-item" to="/post">
                    Create post
                  </Link>
                  <Link key="dashboard" className="dropdown-item" to="#">
                    Dashboard
                  </Link>
                  <Link to="#" key="change-username" className="dropdown-item">
                    Change Username
                  </Link>
                  <Link
                    to="#"
                    key="logout"
                    className="dropdown-item"
                    onClick={() => this.props.authStore.logOut()}
                  >
                    Logout
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="header-new__container container">
          <div className="header-new-image">
            <div className="header-new-text">
              <h1 className="header-new-title">
                It is time Nigerians stood for their right
              </h1>
              <p>
                The current black out in Nigeria has caused millions of
                Nigerians to stay in darkness or spend more money on fuel admist
                the fuel crises...
              </p>
              <button className="header-btn">Read more</button>
            </div>
          </div>
        </div>

        <Dashboard />

        {/* <button onClick={(e) => renderPost(e)}> See posts</button> */}

        <div className="container mt-5 mb-2 text-center">
          <p>Made with Love by Ayomide Bajo</p>
        </div>
      </div>
    );
  }
}

export default Test;
