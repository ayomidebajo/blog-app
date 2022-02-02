import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "mobx-react";
import { authStore } from "./stores/authStore";
import { post } from "./stores/postStore";

const Root = (
  <Provider authStore={authStore} post={post}>
    <App />
  </Provider>
);

ReactDOM.render(
  <React.StrictMode>{Root}</React.StrictMode>,
  document.getElementById("root")
);
