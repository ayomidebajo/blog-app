import React, { Component } from "react";
import authIllustration from "../../assets/blog-illustration.png";
import { inject, observer } from "mobx-react";
import { Redirect } from "react-router";

@inject("signIn", "signUp")
// Add the signin state
@observer
class Signin extends Component {
  state = {
    email: "",
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
      this.props.signIn.signin(this.state);
      if (this.props.signIn.user) {
        this.setState({
          ...this.state,
          cook: this.props.signIn.user,
        });
      }
    };

    if (this.state.cook) {
      return <Redirect to="/" />;
    }
    console.log(this.state, this.props.signIn.user, "baby");
    return (
      <div className="auth--container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 m-sm-auto auth-background p-0 d-flex justify-content-center align-items-center">
            <div className="card auth-card">
              <div className="card-body">
                <h5 className="card-title">Sign in</h5>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mt-3">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      name="email"
                      value={this.state.email}
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
          <div className="col-lg-6 col-md-6 p-0 auth-illustration">
            <img
              src={authIllustration}
              width="90%"
              height="90%"
              alt=""
              srcSet=""
              className="d-none d-lg-block d-md-block"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
