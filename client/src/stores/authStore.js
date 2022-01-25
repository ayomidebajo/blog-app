import { makeObservable, observable, action } from "mobx";
import { fromPromise } from "mobx-utils";
import axios from "axios";
import decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

class SignUpStore {
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
}

class SignInStore {
  @observable user = "";
  @observable testArray = [];

  constructor() {
    makeObservable(this);
  }
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
      // window.location.href = "/login";
      // window.history.pushState();
    }
    setAuthToken(token);
    return;
  };
  get user() {
    return this.user;
  }
}

class LogOut {
  constructor() {
    makeObservable(this);
  }

  @action logOut = () => {
    fromPromise(axios("/api/logout"));
    localStorage.removeItem("user_token");
    window.location.href = "/";
  };
}

const signIn = new SignInStore();
const signUp = new SignUpStore();
const logout = new LogOut();
export { signIn, signUp, logout };
