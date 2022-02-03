import React, { Component } from "react";
import { inject } from "mobx-react";
import coffee from "../assets/coffee.jpeg";
import { Link } from "react-router-dom";

@inject("post")
class Dashboard extends Component {
  //browse for a great color theme
  //search for 20 random default header image or just one illustration for post images
  //search for a great footer design
  componentDidMount() {
    this.props.post.getPosts();
  }
  render() {
    const dateHandle = (val) => {
      if (!val) {
        return;
      }
      let date = [];
      let dateVal;
      let prependDate = val.split("-");
      prependDate = prependDate.splice(2);
      prependDate = prependDate[0];
      prependDate = prependDate.split("T");
      prependDate = prependDate.splice(0, 1);
      prependDate = prependDate[0];
      dateVal = val.split("-");
      dateVal = dateVal.splice(0, 2);
      dateVal = dateVal.join("-");
      date.push(dateVal, prependDate);
      date = date.join("-");
      val = date;

      return val;
    };

    return (
      <div className="main-body mt-5">
        <div className="container">
          <div className="row">
            {this.props.post?.posts?.map((item, i) => (
              <div className="col-lg-6" key={item?.post_id}>
                <div className="card-custom  mb-sm-2">
                  <div className="d-flex">
                    <div className="mr-4">
                      <img
                        src={coffee}
                        alt=""
                        width="100%"
                        height="100%"
                        className="post__img"
                      />
                    </div>
                    <div className="mt-5">
                      <div className="d-flex align-items-center my-2">
                        {/* {" /post-details/${item.post_id}"} */}
                        <div
                          className="avatar dropdown-toggle "
                          type="button"
                        ></div>
                        <small className="blog-card-author">Ayomide Bajo</small>
                      </div>

                      <p className="blog-card-title">
                        {" "}
                        <Link to={`/post-details/${item.post_id}`}>
                          {" "}
                          {item.title}
                        </Link>
                      </p>
                      <div className="reactions-and-more d-flex justify-content-between">
                        <div>2 mins read</div>
                        <div className="">stuff</div>
                      </div>
                      <div className="post-body">
                        {item.body.map
                          ? item.body.map((item) => (
                              <p className="text-truncate" key={item}>
                                {JSON.parse(item).text}
                              </p>
                            ))
                          : item.body}
                        <div className="d-flex justify-content-between align-items-center">
                          <small> {dateHandle(item.created_at)}</small>
                          <div className=""></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
