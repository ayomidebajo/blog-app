import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";

@inject("authStore", "post")
@observer
class Home extends Component {
  //Change footer
  //add comment, like and edit
  // navContainer = React.createRef(null);
  // state = {
  //   isVisble: false,
  // };

  // callBackFunction = (entries) => {
  //   const [entry] = entries;
  //   this.setState({
  //     ...this.state,
  //     isVisble: !entry.isIntersecting,
  //   });
  // };

  // optionsFunc = () => {
  //   let options = {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: [0.0, 1.0],
  //   };
  //   return options;
  // };

  componentDidMount() {
    // const observer = new IntersectionObserver(
    //   this.callBackFunction,
    //   this.optionsFunc
    // );
    // if (this.navContainer.current) {
    //   observer.observe(this.navContainer.current);
    // }
    this.props.post.getPosts();
  }

  render() {
    const token = localStorage.getItem("user_token");

    if (token) {
      this.props.authStore.verifyTokenValidity(token);
    } else {
      return <Redirect to="/login" />;
    }
    //browse for a nice color pallet
    //more ui features
    console.log(this.props, "syin");

    return (
      <div>
        <div className="container">
          {/* <div className="header-new__container">
            <div className="header-image">
              <div className="header-title">
                It is time Nigerians stood for their right
              </div>
              <p>
                The current black out in Nigeria has caused millions of
                Nigerians to stay in darkness or spend more money on fuel admist
                the fuel crises...
              </p>
            </div>
          </div> */}
          {/* <div className="header--container d-flex align-items-center">
            <div className="header-text col-6">
              <p>Welcome to my Blog</p>
              <p>
                I'm just going to express myself and feed you good content at
                the same time
              </p>
              <p>Happy reading!</p>
            </div>

            <div className="header-side">
              <div className="blue-rectangle"></div>
              <div className="header-image"></div>
            </div>
          </div> */}
        </div>
        <Dashboard />
      </div>
    );
  }
}

export default Home;
