import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Redirect } from "react-router";

@inject("signIn", "signUp")
// Add the signin state
@observer
class Home extends Component {
  render() {
    // Cookie.remove("user_token");
    const cook = localStorage.getItem("user_token");

    if (!cook) {
      return <Redirect to="/login" />;
    }

    console.log(this.props.signIn.user, "user");
    return (
      <div>
        Hello from home. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Voluptate, ratione ex nulla et adipisci at dolores aliquid
        deserunt officiis, maxime non saepe quae ullam eligendi iusto eveniet
        officia corporis a!
      </div>
    );
  }
}

export default Home;
