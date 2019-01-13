import React, { Component } from "react";
import "./style/App.css";
import MovieHeader from "./Components/MovieHeader";
import Genres from "./Components/MovieGenres";
import MovieGrid from "./Components/MovieGrid";
import MovieRange from "./Components/MovieRange";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null
    };
  }
  // Called when a genre is clicked
  filterCallback = genres => {
    this.refs.movieGrid.filterGenre(genres);
  };

  // set the genres data that will be used to show on the grid
  setGenres = genres => {
    this.refs.movieGrid.setGenres(genres);
  };

  // called everytime the range is changed
  rangeCallback = value => {
    this.refs.movieGrid.filterRange(value);
  };

  render() {
    return (
      <div className="wrapper">
        <filter>
          <MovieHeader />
          <MovieRange callbackFromParent={this.rangeCallback} />
          <Genres
            filterCallbackfromParent={this.filterCallback}
            callbackFromParent={this.setGenres}
          />
        </filter>
        <MovieGrid ref="movieGrid" />
      </div>
    );
  }
}

export default App;
