import React, { Component } from "react";
import logo from "../resources/logo.png";

class MovieHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="logo-wrapper">
          <img src={logo} alt="Logo" />
          <label>
            My Kino <b>NOW</b>
          </label>
        </div>
      </React.Fragment>
    );
  }
}

export default MovieHeader;
