import { makeObservable, observable, computed, action } from "mobx";
import authStore from "./authStore";

class RootStore {}

const rootStore = new RootStore();

export default rootStore;
