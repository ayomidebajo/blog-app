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
                    <h5 className="card-title">Card title</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Card subtitle
                    </h6>
                    <p className="card-text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Esse harum pariatur omnis, beatae nullLink dolore magni
                      quam officiLink autem, possimus tenetur veniam debitis
                      ducimus aspernatur rerum ratione sint? Reprehenderit, eum!
                    </p>
                    <Link to="#" className="card-link">
                      Ayomide Bajo
                    </Link>
                    <Link to="#" className="card-link">
                      23-11-21
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
