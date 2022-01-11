import { makeObservable, observable, action } from "mobx";
import { fromPromise } from "mobx-utils";
import axios from "axios";

class postStore {
  @observable posts = [];
  constructor() {
    makeObservable(this);
  }

  @action getPosts = async () => {
    const res = fromPromise(axios("http://localhost:5000/api/posts"));
    res.then((results) => {
      try {
        this.posts = results.data;
      } catch (error) {
        console.log(error, "post error");
      }
    });
  };
}

const post = new postStore();
export { post };
