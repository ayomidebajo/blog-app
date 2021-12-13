import { makeObservable, observable, computed, action } from "mobx";
import axios from "axios";
// import rootStore from "./rootStore";

class AuthStore {
  @observable user = "";
  @observable testArray = [];
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
  // @action pushToTest = (content) => {
  //   console.log(content, "content");
  //   this.testArray.push(content);
  // };

  @computed get pushTest() {
    return this.testArray.length;
  }
}

const authStore = new AuthStore();
export default authStore;
