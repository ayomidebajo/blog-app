import { makeObservable, observable, computed, action } from "mobx";
// import rootStore from "./rootStore";

class AuthStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
}

const authStore = new AuthStore();
export default authStore;
