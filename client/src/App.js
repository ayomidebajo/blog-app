import React, { Component } from "react";
import "./style.css";
import "./styles/css/bootstrap.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signin from "./components/authpages/Signin";
import SignUp from "./components/authpages/SignUp";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route component={Signin} path="/signin" />
          <Route component={SignUp} path="/register" />
        </Switch>
      </Router>
    );
  }
}

export default App;
