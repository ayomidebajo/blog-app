import React, { Component } from "react";
import Cookie from "js-cookie";

class Home extends Component {
  render() {
    const cook = Cookie.get("user_token");
    console.log(cook, "i'm cooking something");
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
