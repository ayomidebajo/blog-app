import { makeObservable, observable, action, when, get } from "mobx";
import { fromPromise } from "mobx-utils";
import Cookie from "js-cookie";
import axios from "axios";
import decode from "jwt-decode";

class SignUpStore {
  constructor() {
    makeObservable(this);
  }
  @action signup = async (email, username, password, confirmPassword) => {
    console.log({ email, username, password, confirmPassword });
    let content = { email, username, password, confirmPassword };
    const res = await axios.post("http://localhost:5000/register", content);
    console.log(res, "response from axios and backend");
  };
}

class SignInStore {
  @observable user = "";
  @observable testArray = [];

  constructor() {
    makeObservable(this);
  }
  @action signin = (content) => {
    const res = fromPromise(axios.post("http://localhost:5000/login", content));
    console.log(res.value, "uhm");
    res.then((rest) => {
      const { token } = rest.data;
      const { username } = rest.data;
      this.user = username;
      localStorage.setItem("user_token", token);
      window.location.href = "/";
    });
  };
  @action verifyTokenValidity = (token) => {
    let { exp } = decode(token);
    console.log(exp, "just rest");
    if (exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return;
  };
  get user() {
    return this.user;
  }
}

const signIn = new SignInStore();
const signUp = new SignUpStore();
export { signIn, signUp };
