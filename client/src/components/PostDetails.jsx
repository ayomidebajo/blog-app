import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import TestOne from "./TestOne";

class PostDetails extends Component {
  render() {
    return (
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
        fugiat enim, reprehenderit itaque maxime numquam ea perspiciatis
        repellat porro vero magnam exercitationem odit nisi. Fugiat, nulla
        veritatis? Cumque, aperiam tenetur!
        <Switch>
          <Route path="details/:id" component={TestOne} />
        </Switch>
      </div>
    );
  }
}

export default PostDetails;
