import React, { Component } from "react";
import authIllustration from "../../assets/blog-illustration.png";
import { inject, observer } from "mobx-react";

//Add the signup state
@inject("rootStore", "authStore")
@observer
class SignUp extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    error: "",
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  handeleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state, "local");
    if (this.state.password === this.state.confirmPassword) {
      this.setState({
        ...this.state,
        error: "",
      });
      this.props.authStore.signup(
        this.state.email,
        this.state.username,
        this.state.password,
        this.state.confirmPassword
      );
    } else {
      this.setState({
        ...this.state,
        error: "passwords don't match, try again",
      });
    }
  };
  render() {
    console.log(this.props, "think about it");
    return (
      <div className="auth--container">
        <div className="row">
          <div className="col-lg-6 auth-background p-0 d-flex justify-content-center align-items-center">
            <div className="card auth-card">
              <div className="card-body">
                <h5 className="card-title">Sign up</h5>
                <form onSubmit={this.handeleSubmit}>
                  <div className="form-group mt-3">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      onChange={this.handleChange}
                      name="email"
                      value={this.state.email}
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="exampleInputEmail1">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={this.handleChange}
                      name="username"
                      value={this.state.username}
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="form-group my-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                  <div className="form-group my-3">
                    <label htmlFor="exampleInputPassword1">
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={this.state.confirmPassword}
                      onChange={this.handleChange}
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  <p className="text-danger">{this.state.error}</p>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-6 p-0 auth-illustration">
            <img
              src={authIllustration}
              width="100%"
              height="100%"
              alt=""
              srcSet=""
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
