import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "mobx-react";
import { signUp, signIn } from "./stores/authStore";
import { post } from "./stores/postStore";

const Root = (
  <Provider signIn={signIn} signUp={signUp} post={post}>
    <App />
  </Provider>
);

ReactDOM.render(
  <React.StrictMode>{Root}</React.StrictMode>,
  document.getElementById("root")
);
