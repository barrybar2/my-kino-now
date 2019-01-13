import React, { Component } from "react";
import axios from "axios";
import "../style/MovieGenres.css";

class Faceted extends Component {
  constructor(props) {
    super(props);
    this.state = {
      APIUrl: "https://api.themoviedb.org/3/genre/movie/list?api_key=",
      TMDBKey: "1e76801a7b64fc5408edbe0f65790d2b",
      genres: null,
      selectedGenres: [],
      averageVote: 0
    };
    this.filterByGenre = this.filterByGenre.bind(this);
  }

  // add to the selected Genres array.
  // This is then used in App.js to filter bt genre
  filterByGenre(e) {
    let selectedGenres = this.state.selectedGenres;
    selectedGenres = this.updateGenreArr(e.target, selectedGenres);
    this.setState({ selectedGenres: selectedGenres });
    // passes selected genres to App.js
    this.props.filterCallbackfromParent(selectedGenres);
  }

  // if the genre is being checked add to array, otherwise remove
  updateGenreArr(target, selectedGenres) {
    if (target.checked) {
      return selectedGenres.concat(target.value);
    } else {
      //remove from array if unchecking an option
      const index = selectedGenres.indexOf(target.value);
      selectedGenres.splice(index, 1);
      return selectedGenres;
    }
  }
  // Get the available genres from the API
  // Return the genres back to App.js
  // update the genre list for the UI
  async componentDidMount() {
    const genres = (await axios.get(this.state.APIUrl + this.state.TMDBKey))
      .data;
    this.props.callbackFromParent(genres);
    this.setState({ genres: genres.genres });
  }
  render() {
    return (
      <React.Fragment>
        <h4>Genres</h4>
        {this.state.genres === null && <p>Loading Genres...</p>}
        {this.state.genres &&
          this.state.genres.map(genre => (
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={genre.id}
                onChange={this.filterByGenre}
              />
              <label className="form-check-label">{genre.name}</label>
            </div>
          ))}
      </React.Fragment>
    );
  }
}

export default Faceted;
