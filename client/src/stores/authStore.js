import { makeObservable, observable, action, computed } from "mobx";
import { fromPromise } from "mobx-utils";
import { create, persist } from "mobx-persist";
import axios from "axios";
import decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

class AuthStore {
  @persist @observable user = "";
  constructor() {
    makeObservable(this);
  }

  @action signup = async (email, username, password, confirmPassword) => {
    console.log({ email, username, password, confirmPassword });
    let content = { email, username, password, confirmPassword };
    // eslint-disable-next-line no-unused-vars
    const res = await axios.post("/api/register", content);
    //Add check for register failure
    window.location.href = "/login";
  };
  @action logOut = () => {
    fromPromise(axios("/api/logout"));
    localStorage.removeItem("user_token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  @action signin = (content) => {
    const res = fromPromise(axios.post("/api/login", content));
    // console.log(res.value, "uhm");
    res.then((rest) => {
      try {
        console.log(rest, "rest data");
        const { token } = rest.data;
        const { username } = rest.data;

        this.user = username;
        localStorage.setItem("user_token", token);

        window.location.href = "/";
      } catch (error) {
        console.log(error, "errors");
      }
    });
  };
  @action verifyTokenValidity = (token) => {
    let { exp } = decode(token);
    console.log(exp, Date.now() / 1000, "just rest");
    if (exp < Date.now() / 1000) {
      localStorage.removeItem("user_token");
      localStorage.removeItem("user");

      // window.location.href = "/login";
      // window.history.pushState();
    }
    setAuthToken(token);
    return;
  };
  get user() {
    return JSON.parse(this.user);
  }
}

const hydrate = create({
  storage: localStorage,
  jsonify: true,
});

const authStore = new AuthStore();

hydrate("user", authStore).then((res) => console.log(res, "outside"));

export { authStore };
