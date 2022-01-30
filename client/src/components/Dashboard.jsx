import React, { Component } from "react";
import { inject } from "mobx-react";
import coffee from "../assets/coffee.jpeg";

@inject("post")
class Dashboard extends Component {
  //browse for a great color theme
  //search for 20 random default header image or just one illustration for post images
  //search for a great footer design

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
            {this.props.post.posts.map((item) => (
              <div className="card-custom col-lg-4 mb-sm-2">
                <div className="">
                  <div className="">
                    <img
                      src={coffee}
                      alt=""
                      width="100%"
                      height="100%"
                      className="post__img"
                    />
                    <div className="d-flex align-items-center my-2">
                      {" "}
                      <div
                        className="avatar dropdown-toggle"
                        type="button"
                      ></div>
                      <div className="">Ayomide Bajo</div>
                    </div>
                    <div className="post-title">
                      <p className=" font-weight-bold"> {item.title}</p>
                    </div>
                    <div className="post-body">
                      {item.body.map
                        ? item.body.map((item) => (
                            <p className="text-truncate">
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
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;