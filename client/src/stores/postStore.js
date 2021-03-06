import { makeObservable, observable, action } from "mobx";
import { fromPromise } from "mobx-utils";
import axios from "axios";

class postStore {
  @observable posts = [];
  @observable post = {};
  @observable newPost = [];
  // body, title, author, draft
  constructor() {
    makeObservable(this);
  }

  @action getPosts = async () => {
    const res = fromPromise(axios("/api/posts"));
    res.then((results) => {
      // console.log(results, "i heard");
      try {
        this.posts = results.data.data;
        // console.log(results.data.data, "data");
      } catch (error) {
        console.log(error, "post error");
      }
    });
  };
  @action createPost = async (content) => {
    const res = fromPromise(axios.post("/api/create-post", content));
    res.then((results) => {
      // console.log(results, "i heard");
      try {
        this.newPost = results.data.data;
        // console.log(results.data.data, "data");
      } catch (error) {
        console.log(error, "post error");
      }
    });
  };
  @action getSinglePost = async (id) => {
    const res = fromPromise(axios(`/api/post/${id}`));
    res.then((results) => {
      console.log(results, "I heard");
      try {
        this.post = results.data.data;
        console.log(results.data.data, "data");
      } catch (error) {
        console.log(error, "post error");
      }
    });
  };
}

const post = new postStore();
export { post };
