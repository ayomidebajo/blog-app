import React, { Component } from "react";
import { inject } from "mobx-react";
import { Link } from "react-router-dom";

@inject("post")
class Dashboard extends Component {
  render() {
    return (
      <div className="main-body mt-5">
        <div className="container">
          <div className="row">
            {this.props.post.posts.map((item) => (
              <div className="col-lg-4" key={item.id}>
                <div className="card mt-2 mt-lg-2" style={{ width: "100%" }}>
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>

                    <p className="card-text">{item.body}</p>
                    <Link to="#" className="card-link">
                      {item.author}
                    </Link>
                    <Link to="#" className="card-link">
                      {item.created_at}
                    </Link>
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
