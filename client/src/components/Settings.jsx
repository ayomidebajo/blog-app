import React, { Component } from "react";
// import { Link } from "react-router-dom";

class Settings extends Component {
  render() {
    return (
      <div className="main--container">
        {/* <div className="navbar-custom__container" ref={this.navContainer}>
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
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <Link key="create-post" className="dropdown-item" to="/posts">
                    Create post
                  </Link>
                  <Link key="dashboard" className="dropdown-item" href="#">
                    Dashboard
                  </Link>
                  <Link
                    key="change-username"
                    className="dropdown-item"
                    href="#"
                  >
                    Change Username
                  </Link>
                  <Link
                    key="logout"
                    className="dropdown-item"
                    onClick={() => this.props.logout.logOut()}
                  >
                    Logout
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div> */}
        <div class="main-body mt-5">
          <div class="container">
            <div class="row">
              <div class="col-3">
                <div
                  class="nav flex-column nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <a
                    class="nav-link active"
                    id="v-pills-home-tab"
                    data-toggle="pill"
                    href="#v-pills-home"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    Profile
                  </a>
                  <a
                    class="nav-link"
                    id="v-pills-profile-tab"
                    data-toggle="pill"
                    href="#v-pills-profile"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    Change password
                  </a>
                  <a
                    class="nav-link"
                    id="v-pills-messages-tab"
                    data-toggle="pill"
                    href="#v-pills-messages"
                    role="tab"
                    aria-controls="v-pills-messages"
                    aria-selected="false"
                  >
                    Stats
                  </a>
                  <a
                    class="nav-link"
                    id="v-pills-settings-tab"
                    data-toggle="pill"
                    href="#v-pills-settings"
                    role="tab"
                    aria-controls="v-pills-settings"
                    aria-selected="false"
                  >
                    Settings
                  </a>
                </div>
              </div>
              <div class="col-9">
                <div class="tab-content" id="v-pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    <div class="card auth-card">
                      <div class="card-body">
                        <h5 class="card-title">Edit profile</h5>
                        <form>
                          <div class="row">
                            <div class="col-lg-6">
                              <div class="form-group mt-3">
                                <label for="exampleInputEmail1">
                                  Email address
                                </label>
                                <input
                                  type="email"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                />
                                <small
                                  id="emailHelp"
                                  class="form-text text-muted"
                                >
                                  We'll never share your email with anyone else.
                                </small>
                              </div>
                            </div>
                            <div class="col-lg-6">
                              <div class="form-group mt-3">
                                <label for="exampleInputEmail1">Username</label>
                                <input
                                  type="email"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="form-group my-3">
                            <label for="exampleInputPassword1">Password</label>
                            <input
                              type="password"
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
                  <div
                    class="tab-pane fade"
                    id="v-pills-profile"
                    role="tabpanel"
                    aria-labelledby="v-pills-profile-tab"
                  >
                    {" "}
                    <div class="card auth-card">
                      <div class="card-body">
                        <h5 class="card-title">Change password</h5>
                        <form>
                          <div class="form-group mt-3">
                            <label for="exampleInputEmail1">
                              Current password
                            </label>
                            <input
                              type="email"
                              class="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                            />
                            <small id="emailHelp" class="form-text text-muted">
                              We'll never share your email with anyone else.
                            </small>
                          </div>

                          <div class="form-group mt-3">
                            <label for="exampleInputEmail1">New password</label>
                            <input
                              type="email"
                              class="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                            />
                          </div>

                          <div class="form-group my-3">
                            <label for="exampleInputPassword1">Password</label>
                            <input
                              type="password"
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
                  <div
                    class="tab-pane fade"
                    id="v-pills-messages"
                    role="tabpanel"
                    aria-labelledby="v-pills-messages-tab"
                  >
                    ...
                  </div>
                  <div
                    class="tab-pane fade"
                    id="v-pills-settings"
                    role="tabpanel"
                    aria-labelledby="v-pills-settings-tab"
                  >
                    ...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
