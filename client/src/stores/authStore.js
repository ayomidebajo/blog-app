import { makeObservable, observable, computed, action, when } from "mobx";
import { fromPromise } from "mobx-utils";

import axios from "axios";
// import rootStore from "./rootStore";

class SignUpStore {
  // @observable user = "";
  // @observable testArray = [];
  constructor() {
    makeObservable(this);
  }
  @action signup = async (email, username, password, confirmPassword) => {
    console.log({ email, username, password, confirmPassword });
    let content = { email, username, password, confirmPassword };
    const res = await axios.post("http://localhost:5000/register", content);
    console.log(res, "response from axios and backend");
    // this.testArray.push(...this.testArray, content);
  };

  // @computed get pushTest() {
  //   return this.testArray.length;
  // }
}

class SignInStore {
  @observable user = "";
  @observable testArray = [];

  constructor() {
    makeObservable(this);
  }
  @action signin = (content) => {
    // console.log(content, "content");
    const res = fromPromise(axios.post("http://localhost:5000/login", content));
    console.log(res.value, "uhm");
    when(
      () => res.state !== "pending",
      () => {
        console.log("I got", content, res.value);
      }
    );

    // console.log(res, "response from axios and backend");
    // return res;
    // this.testArray.push(content);
  };
}

const signIn = new SignInStore();
const signUp = new SignUpStore();
export { signIn, signUp };
