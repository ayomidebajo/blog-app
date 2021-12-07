import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "mobx-react";
import rootStore from "./stores/rootStore";
import authStore from "./stores/authStore";

const Root = (
  <Provider rootStore={rootStore} authStore={authStore}>
    <App />
  </Provider>
);

ReactDOM.render(
  <React.StrictMode>{Root}</React.StrictMode>,
  document.getElementById("root")
);
