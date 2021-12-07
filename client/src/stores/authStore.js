import { makeObservable, observable, computed, action } from "mobx";
// import rootStore from "./rootStore";

class AuthStore {
  @observable user = "";
  @observable testArray = [];
  constructor() {
    makeObservable(this);
  }
  @action signup = (email, username, password, confirmPassword) => {};
  @action pushToTest = (content) => {
    console.log(content, "content");
    this.testArray.push(content);
  };

  @computed get pushTest() {
    return this.testArray.length;
  }
}

const authStore = new AuthStore();
export default authStore;
