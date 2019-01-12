import React, { Component } from "react";
import axios from "axios";
import "../MovieGrid.css";

class Movies extends Component {
  constructor(props) {
    super(props);
    //moviesMaster is an immutable list that doesn't change once set.
    this.state = {
      APIUrl: "https://api.themoviedb.org/3/movie/now_playing?api_key=",
      TMDBKey: "1e76801a7b64fc5408edbe0f65790d2b",
      moviesMaster: null,
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

  //compare Genres against the genre ids for the movies.
  filterCallback(genres) {
    return function(element) {
      return genres.some(g => element.genre_ids.indexOf(parseInt(g)) >= 0);
    };
  }

  //update the movies based on the selected genres
  filterGenre(genres) {
    let filteredList = [];
    //if there are no selected genres, return the master list.
    if (genres.length === 0) {
      filteredList = this.state.moviesMaster;
    } else {
      filteredList = this.state.moviesMaster.filter(
        this.filterCallback(genres)
      );
    }
    // sort list by popularity
    filteredList = filteredList.sort(this.comparePop);
    this.setState({
      movies: filteredList
    });
  }

  // Filter Range
  filterRange(popVal) {
    console.log(popVal);
  }

  async componentDidMount() {
    const movies = (await axios.get(this.state.APIUrl + this.state.TMDBKey))
      .data;
    let sortedArray = movies.results.sort(this.comparePop);
    this.setState({
      moviesMaster: sortedArray,
      movies: sortedArray
    });
  }

  render() {
    return (
      <main>
        {this.state.movies === null && <p>Loading movies...</p>}
        {this.state.movies &&
          this.state.movies.map(movie => (
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w342${movie.backdrop_path}`}
              />
            </div>
          ))}
      </main>
    );
  }
}

export default Movies;
