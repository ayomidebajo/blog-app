import React, { Component } from "react";
import "./style.css";
import "./styles/css/bootstrap.css";
import { inject, observer } from "mobx-react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Signin from "./components/authpages/Signin";
import SignUp from "./components/authpages/SignUp";
import Home from "./components/Home";

const token = localStorage.getItem("user_token")
  ? localStorage.getItem("user_token")
  : null;

@inject("signIn")
// Add the signin state
@observer
class App extends Component {
  render() {
    if (token) {
      this.props.signIn.verifyTokenValidity(token);
    } else {
      return <Redirect to="/login" />;
    }
    return (
      <Router>
        <Switch>
          <Route exact component={Home} path="/" />
          <Route component={Signin} path="/login" />
          <Route component={SignUp} path="/register" />
        </Switch>
      </Router>
    );
  }
}

export default App;
