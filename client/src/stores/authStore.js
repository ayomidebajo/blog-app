import { makeObservable, observable, action, when, get } from "mobx";
import { fromPromise } from "mobx-utils";
import Cookie from "js-cookie";
import axios from "axios";

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
      Cookie.set("user_token", token);
      console.log(this.user, "just rest");
      // window.location.reload();
    });

    // return when(
    //   () => res.state !== "pending",
    //   () => {
    //     const { token } = res.value.data;
    //     this.user = res.value.data.username;
    //     Cookie.set("user_token", token);
    //     window.location.reload();
    //   }
    // );
  };
  get user() {
    return this.user;
  }
}

const signIn = new SignInStore();
const signUp = new SignUpStore();
export { signIn, signUp };
