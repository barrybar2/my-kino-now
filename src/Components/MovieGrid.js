import React, { Component } from "react";
import axios from "axios";
import "../style/MovieGrid.css";

class Movies extends Component {
  constructor(props) {
    super(props);
    //moviesMaster is an immutable list that doesn't change once set.
    this.state = {
      APIUrl: "https://api.themoviedb.org/3/movie/now_playing?api_key=",
      imageAPI: "https://image.tmdb.org/t/p/w342",
      TMDBKey: "1e76801a7b64fc5408edbe0f65790d2b",
      moviesMaster: null,
      movies: [],
      genresMaster: [],
      selectedGenres: [],
      rangeVal: 0,
      loadingText: ["Loading Movies", "Please Wait", "Just a Sec.."]
    };
  }

  // Callback function for order the movies based on popularity
  // API already appears to sort by this, but just in case the API orders change
  comparePop(a, b) {
    if (a.popularity > b.popularity) return 1;
    if (b.popularity < a.popularity) return -1;
    return 0;
  }

  // set the genres list for use on the grid
  setGenres(genres) {
    this.setState({
      genresMaster: genres.genres
    });
  }

  // compare Genres against the genre ids for the movies.
  // To get the range and the genre filter together, I need to check both while filtering
  // this function is called when the range is change AND when a genre option is selected
  filterCallback(genres, popVal) {
    let gen = genres || this.state.selectedGenres;
    let val = popVal || this.state.rangeVal;
    // filtering based on the selected genres and the range everytime, regardless of where the function is initiated
    return function(element) {
      if (
        (gen.length === 0 ||
          gen.some(g => element.genre_ids.indexOf(parseInt(g)) >= 0)) &&
        element.vote_average >= val
      ) {
        return true;
      }
      return false;
    };
  }

  //update the movies based on the selected genres
  filterGenre(genres) {
    let filteredList = [];
    filteredList = this.state.moviesMaster.filter(
      this.filterCallback(genres, null)
    );
    // sort list by popularity
    filteredList = filteredList.sort(this.comparePop);
    this.setState({
      movies: filteredList,
      selectedGenres: genres
    });
  }
  // Filter Range
  filterRange(popVal) {
    let filteredList = [];
    filteredList = this.state.moviesMaster.filter(
      this.filterCallback(null, popVal)
    );
    this.setState({
      movies: filteredList,
      rangeVal: popVal
    });
  }

  getGenreById(id) {
    return function(genre) {
      return id === genre.id;
    };
  }

  getGenreTitle(id) {
    const genres = this.state.genresMaster;
    const title = genres.find(this.getGenreById(id));
    return title.name;
  }

  async componentDidMount() {
    const movies = (await axios.get(this.state.APIUrl + this.state.TMDBKey))
      .data;
    let sortedArray = movies.results.sort(this.comparePop);
    //update the loading texts after initial load of TMDB API
    const loadingText = ["No Movies Found", "Refine your search", ":)"];
    this.setState({
      moviesMaster: sortedArray,
      movies: sortedArray,
      loadingText
    });
  }

  render() {
    return (
      <main>
        {this.state.movies.length === 0 &&
          this.state.loadingText.map(text => (
            <div className="loading-movies gradient">
              <h4> {text}</h4>
            </div>
          ))}
        {this.state.movies &&
          this.state.movies.map(movie => (
            <div>
              <img src={`${this.state.imageAPI}${movie.backdrop_path}`} />
              <label>{movie.original_title}: </label>
              {this.state.genresMaster.length > 0 &&
                movie.genre_ids.map(id => (
                  <span className="badge badge-secondary">
                    {this.getGenreTitle(id)}
                  </span>
                ))}
            </div>
          ))}
      </main>
    );
  }
}

export default Movies;
