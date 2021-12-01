import { makeObservable, observable, computed, action } from "mobx";
import authStore from "./authStore";

class RootStore {
  constructor() {
    this.authStore = new authStore(this);
  }
}

const rootStore = new RootStore();

export default rootStore;
