import React, { Component } from "react";
import { inject } from "mobx-react";
import { Link } from "react-router-dom";
import coffee from "../assets/coffee.jpeg";

@inject("post")
class Dashboard extends Component {
  //Change cards look
  //browse for a great color theme

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
              <div className="card-custom col-lg-4">
                <div className="">
                  <div className="">
                    <img
                      src={coffee}
                      alt=""
                      width="100%"
                      height="100%"
                      className="post__img"
                    />
                    <div className="post-title">
                      <p className=" font-weight-bold"> {item.title}</p>
                    </div>
                    <div className="post-body">
                      <p className="text-truncate">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Nulla voluptas error nam quis fugiat recusandae
                        eos distinctio, rerum qui? Voluptate atque deserunt
                        maiores dolores itaque voluptatem cum explicabo fugit
                        quam?
                      </p>
                      <small>19, Jan, 2022</small>
                    </div>
                  </div>
                </div>
              </div>
              // <div className="col-lg-4" key={item.id}>
              //   <div
              //     className="card-custom mt-2 mt-lg-2"
              //     style={{ width: "100%" }}
              //   >
              //     <div className="card-body">
              //       <h5 className="card-title">{item.title}</h5>

              //       <p className="card-text">{item.body.text}</p>
              //       <Link to="#" className="card-link">
              //         {item.author}
              //       </Link>
              //       <Link to="#" className="card-link">
              //         {dateHandle(item.created_at)}
              //       </Link>
              //     </div>
              //   </div>
              // </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
