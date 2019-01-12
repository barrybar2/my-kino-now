import React, { Component } from "react";
import axios from "axios";
import "../Faceted.css";

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
    this.props.callbackFromParent(selectedGenres);
  }

  // if the genre is being checked add to array, otherwise remove
  updateGenreArr(target, selectedGenres) {
    if (target.checked) {
      return selectedGenres.concat(target.value);
    } else {
      var index = selectedGenres.indexOf(target.value);
      selectedGenres.splice(index, 1);
      return selectedGenres;
    }
  }

  async componentDidMount() {
    const genres = (await axios.get(this.state.APIUrl + this.state.TMDBKey))
      .data;
    this.setState({ genres: genres.genres });
  }
  render() {
    return (
      <React.Fragment>
        {this.state.genres === null && <p>Loading Genres...</p>}
        {this.state.genres &&
          this.state.genres.map(genre => (
            <div>
              <input
                type="checkbox"
                value={genre.id}
                onChange={this.filterByGenre}
              />
              {genre.name}
            </div>
          ))}
      </React.Fragment>
    );
  }
}

export default Faceted;
