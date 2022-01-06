import { makeObservable, observable, action } from "mobx";
import { fromPromise } from "mobx-utils";
import axios from "axios";
import decode from "jwt-decode";

class SignUpStore {
  constructor() {
    makeObservable(this);
  }
  @action signup = async (email, username, password, confirmPassword) => {
    console.log({ email, username, password, confirmPassword });
    let content = { email, username, password, confirmPassword };
    // eslint-disable-next-line no-unused-vars
    const res = await axios.post("http://localhost:5000/api/register", content);
  };
}

class SignInStore {
  @observable user = "";
  @observable testArray = [];

  constructor() {
    makeObservable(this);
  }
  @action signin = (content) => {
    const res = fromPromise(
      axios.post("http://localhost:5000/api/login", content)
    );
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
    console.log(exp, Date.now() / 1000, "just rest");
    if (exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      // window.history.pushState();
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
