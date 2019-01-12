import React, { Component } from "react";
import "./App.css";
import logo from "./logo.svg";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TMDBKey: "1e76801a7b64fc5408edbe0f65790d2b",
      movies: null
    };
  }
  // compare the popularity
  // API already appears to sort by this, but just in case?
  comparePop(a, b) {
    if (a.popularity > b.popularity) return 1;
    if (b.popularity < a.popularity) return -1;

    return 0;
  }

  async componentDidMount() {
    const movies = (await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=" +
        this.state.TMDBKey
    )).data;
    let sortedArray = movies.results.sort(this.comparePop);
    this.setState({
      movies: sortedArray
    });
  }
  render() {
    return (
      <div className="movie-grid">
        {this.state.movies === null && <p>Loading movies...</p>}
        {this.state.movies &&
          this.state.movies.map(movie => (
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w342${movie.backdrop_path}`}
              />
            </div>
          ))}
      </div>
    );
  }
}

export default App;
