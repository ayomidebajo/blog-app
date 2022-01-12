import React, { Component } from "react";
import "./style.css";
import "./styles/css/bootstrap.css";
import { inject, observer } from "mobx-react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signin from "./components/authpages/Signin";
import SignUp from "./components/authpages/SignUp";
import Home from "./components/Home";
import AddPost from "./components/AddPost";

@inject("signIn")
// Add the signin state
@observer
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact component={Home} path="/" />
          <Route component={Signin} path="/login" />
          <Route component={SignUp} path="/register" />
          <Route component={AddPost} path="/posts" />
        </Switch>
      </Router>
    );
  }
}

export default App;
