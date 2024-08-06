import React, { Component } from "react";

class Animation extends Component {
  render() {
    return (
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "30vh", width: "100vw" }}
      >
        <img
          style={{ width: "100px" }}
          src="https://i.ibb.co/Fm67K0t/loading.gif"
          alt="animation"
        />
      </div>
    );
  }
}
export default Animation;
