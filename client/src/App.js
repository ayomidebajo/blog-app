import React, { Component } from "react";
import "./style.css";
import "./styles/css/bootstrap.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signin from "./components/authpages/Signin";
import SignUp from "./components/authpages/SignUp";
import Home from "./components/Home";

class App extends Component {
  render() {
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
