import React, { Component } from "react";
import authIllustration from "../../assets/blog-illustration.png";
import { inject, observer } from "mobx-react";
import Cookie from "js-cookie";

@inject("signIn", "signUp")
// Add the signin state
@observer
class Signin extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.props.signIn.signin(this.state);
  };
  render() {
    // const { signUp } = this.props;
    console.log(this.props, "this props");
    return (
      <div class="auth--container">
        {/* <p>checking...{SignUpStore}</p> */}
        <div class="row">
          <div class="col-lg-6 auth-background p-0 d-flex justify-content-center align-items-center">
            <div class="card auth-card">
              <div class="card-body">
                <h5 class="card-title">Sign in</h5>
                <form onSubmit={this.handleSubmit}>
                  <div class="form-group mt-3">
                    <label for="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                    <small id="emailHelp" class="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div class="form-group my-3">
                    <label for="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      class="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>

                  <button type="submit" class="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div class="col-lg-6 p-0 auth-illustration">
            <img
              src={authIllustration}
              width="100%"
              height="100%"
              alt=""
              srcset=""
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
