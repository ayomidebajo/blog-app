import React, { Component } from "react";
import authIllustration from "../../assets/blog-illustration.png";
import { inject, observer } from "mobx-react";

@inject("authStore")
// Add the signin state
@observer
class Signin extends Component {
  state = {
    username: "",
    password: "",
    cook: "",
  };

  render() {
    const handleChange = (e) => {
      this.setState({
        ...this.state,
        [e.target.name]: e.target.value,
      });
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(this.state);
      this.props.authStore.signin(this.state);
      if (this.props.signIn.user) {
        this.setState({
          ...this.state,
          cook: this.props.authStore.user,
        });
      }
    };

    console.log(this.state, this.props, "baby");
    return (
      <div className="auth--container row mt-5">
        <div className="col-lg-6 col-md-5 col-sm-5 m-sm-auto auth-background p-0 d-flex justify-content-center align-items-center">
          <div className="card auth-card">
            <div className="card-body">
              <h5 className="card-title">Sign in</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-3">
                  <label htmlFor="exampleInputEmail1">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group my-3">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-7 p-0  auth-illustration__container">
          <img
            src={authIllustration}
            alt=""
            srcSet=""
            className="d-none d-lg-block d-md-block auth-illustration mx-auto"
          />
        </div>
      </div>
    );
  }
}

export default Signin;
