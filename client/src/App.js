import React, { Component } from "react";
import "./style.css";
import "./styles/css/bootstrap.css";
import { inject, observer } from "mobx-react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { history } from "./utils/history";
import Signin from "./components/authpages/Signin";
import SignUp from "./components/authpages/SignUp";
import Home from "./components/Home";
import AddPost from "./components/AddPost";
import PostDetails from "./components/PostDetails";
import Settings from "./components/Settings";
import CONSTANTS from "./components/resuables/routes.json";
import PrivateRoute from "./utils/PrivateRoute";
import Test from "./components/test";

@inject("authStore")
// Add the signin states
@observer
class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          {/* <PrivateRoute path={CONSTANTS.ROUTES.HOME} component={Home}/> */}
          <Route component={Test} exact path="/" />
          {/* <Route exact component={Home} path={CONSTANTS.ROUTES.HOME} /> */}
          <Route component={Signin} path={CONSTANTS.ROUTES.LOGIN} />
          <Route component={SignUp} path={CONSTANTS.ROUTES.REGISTER} />
          <Route component={AddPost} path={CONSTANTS.ROUTES.POST} />
          <Route component={PostDetails} path={CONSTANTS.ROUTES.POST_DETAILS} />
          {/* <Route component={Settings} path={CONSTANTS.ROUTES.SETTINGS} /> */}
        </Switch>
      </Router>
    );
  }
}

export default App;
