import React, { Component } from "react";
import "./App.css";
import logo from "./logo.svg";
import Genres from "./Components/MovieGenres";
import MovieGrid from "./Components/MovieGrid";
import MovieRange from "./Components/MovieRanges";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null
    };
  }

  filterCallback = genres => {
    this.refs.movieGrid.filterGenre(genres);
  };

  rangeCallback = value => {
    this.refs.movieGrid.filterRange(value);
  };

  render() {
    return (
      <div className="container">
        <header />
        <filter>
          <Genres callbackFromParent={this.filterCallback} />
          <MovieRange callbackFromParent={this.rangeCallback} />
        </filter>

        <MovieGrid ref="movieGrid" />
      </div>
    );
  }
}

export default App;
