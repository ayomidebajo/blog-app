import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Editor, EditorState } from "draft-js";
import { Link } from "react-router-dom";
import "draft-js/dist/Draft.css";

// import { Link } from "react-router-dom";

@inject("signIn", "signUp", "post")
// Add the signin state

@observer
class AddPost extends Component {
  navContainer = React.createRef(null);
  state = {
    isVisble: false,
    editorState: EditorState.createEmpty(),
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

  onChange = (editorState) => {
    this.setState({
      ...this.state,
      editorState,
    });
  };

  componentDidMount() {
    const observer = new IntersectionObserver(
      this.callBackFunction,
      this.optionsFunc
    );
    if (this.navContainer.current) {
      observer.observe(this.navContainer.current);
    }
  }
  render() {
    return (
      <div className="main--container">
        <div className="navbar-custom__container" ref={this.navContainer}>
          <div
            className={`navbar-custom ${
              this.state.isVisble ? "navbar-custom__active" : ""
            }`}
          >
            <ul className="navbar-links__container">
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
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <Link class="dropdown-item" to="/posts">
                    Create post
                  </Link>
                  <Link class="dropdown-item" href="#">
                    Dashboard
                  </Link>
                  <Link class="dropdown-item" href="#">
                    Change Username
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="container container-editor">
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </div>

        <div className="row mt-5 container mx-auto bottom-menu">
          <div className="col-lg-4 mt-3">
            <p className="secondary-color font-weight-bold">MENU</p>
            <div>Home</div>
            <div>About Us</div>
            <div>Services</div>
            <div>Products</div>
            <div>Career</div>
            <div>Contacts</div>
          </div>
        </div>

        <div className="container mt-5 mb-2">
          <div className="row mx-2">
            <div className="col-lg-2 d-flex justify-content-between">
              <span className="">
                <svg
                  width="25"
                  height="20"
                  viewBox="0 0 25 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24.6183 2.37575C23.713 2.76628 22.7278 3.04735 21.713 3.15682C22.7666 2.53089 23.5556 1.54202 23.9319 0.375752C22.9433 0.963885 21.8602 1.37629 20.7308 1.59469C20.2587 1.09003 19.6878 0.687999 19.0535 0.413643C18.4193 0.139287 17.7354 -0.00151415 17.0444 1.22793e-05C14.2485 1.22793e-05 12 2.26628 12 5.04735C12 5.43788 12.0473 5.82841 12.1243 6.20415C7.93786 5.98522 4.20414 3.98522 1.72189 0.923089C1.2696 1.69562 1.03258 2.57524 1.0355 3.47042C1.0355 5.2219 1.92603 6.76628 3.28402 7.67456C2.48374 7.64305 1.7022 7.42308 1.00296 7.03255V7.09468C1.00296 9.54734 2.73668 11.5799 5.04733 12.0473C4.61348 12.16 4.16718 12.2177 3.71893 12.2189C3.39053 12.2189 3.07988 12.1864 2.76627 12.142C3.40532 14.142 5.26627 15.5947 7.48224 15.642C5.74852 17 3.57692 17.7988 1.21893 17.7988C0.795858 17.7988 0.405325 17.784 0 17.7367C2.23668 19.1716 4.89053 20 7.74852 20C17.0266 20 22.1035 12.3136 22.1035 5.64202C22.1035 5.42309 22.1035 5.20415 22.0887 4.98522C23.071 4.26628 23.9319 3.37575 24.6183 2.37575Z"
                    fill="#047B40"
                  />
                </svg>
              </span>
              <span className="">
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.6172 0C5.09516 0 0.618164 4.477 0.618164 9.999C0.618164 14.989 4.27416 19.125 9.05516 19.878V12.89H6.51516V9.999H9.05516V7.796C9.05516 5.288 10.5482 3.905 12.8312 3.905C13.9252 3.905 15.0712 4.1 15.0712 4.1V6.559H13.8072C12.5672 6.559 12.1792 7.331 12.1792 8.122V9.997H14.9502L14.5072 12.888H12.1792V19.876C16.9602 19.127 20.6162 14.99 20.6162 9.999C20.6162 4.477 16.1392 0 10.6172 0Z"
                    fill="#047B40"
                  />
                </svg>
              </span>
              <span className="">
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.7319 6.66525C8.89563 6.66525 7.39712 8.16376 7.39712 10C7.39712 11.8362 8.89563 13.3348 10.7319 13.3348C12.5681 13.3348 14.0666 11.8362 14.0666 10C14.0666 8.16376 12.5681 6.66525 10.7319 6.66525ZM20.7336 10C20.7336 8.61907 20.7461 7.25064 20.6686 5.87221C20.591 4.27113 20.2258 2.85017 19.055 1.67938C17.8817 0.506085 16.4632 0.14334 14.8622 0.065788C13.4812 -0.0117644 12.1128 0.000744113 10.7344 0.000744113C9.35344 0.000744113 7.98502 -0.0117644 6.60659 0.065788C5.0055 0.14334 3.58454 0.508587 2.41375 1.67938C1.24046 2.85267 0.877715 4.27113 0.800163 5.87221C0.722611 7.25314 0.735119 8.62157 0.735119 10C0.735119 11.3784 0.722611 12.7494 0.800163 14.1278C0.877715 15.7289 1.24296 17.1498 2.41375 18.3206C3.58705 19.4939 5.0055 19.8567 6.60659 19.9342C7.98752 20.0118 9.35594 19.9993 10.7344 19.9993C12.1153 19.9993 13.4837 20.0118 14.8622 19.9342C16.4632 19.8567 17.8842 19.4914 19.055 18.3206C20.2283 17.1473 20.591 15.7289 20.6686 14.1278C20.7486 12.7494 20.7336 11.3809 20.7336 10ZM10.7319 15.131C7.89245 15.131 5.60091 12.8394 5.60091 10C5.60091 7.16058 7.89245 4.86903 10.7319 4.86903C13.5713 4.86903 15.8628 7.16058 15.8628 10C15.8628 12.8394 13.5713 15.131 10.7319 15.131ZM16.073 5.8572C15.41 5.8572 14.8747 5.32184 14.8747 4.65889C14.8747 3.99594 15.41 3.46058 16.073 3.46058C16.7359 3.46058 17.2713 3.99594 17.2713 4.65889C17.2715 4.81631 17.2406 4.97222 17.1805 5.1177C17.1203 5.26317 17.0321 5.39535 16.9208 5.50666C16.8094 5.61798 16.6773 5.70624 16.5318 5.76639C16.3863 5.82654 16.2304 5.8574 16.073 5.8572Z"
                    fill="#047B40"
                  />
                </svg>
              </span>
            </div>
            <div className="col-lg-10 mt-3 mt-lg-0 bottom-wrapper secondary-color">
              COPYRIGHT IKOOBLink TECHNOLOGIES 2020 -
              <span className="bottom-terms">
                TERMS & CONDITIONS PRIVACY POLICY
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddPost;
