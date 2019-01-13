import React, { Component } from "react";

class MovieRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voteValue: 0
    };
    this.onRangeChange = this.onRangeChange.bind(this);
  }
  // update the number above the range input
  // passes range value back to App.js
  onRangeChange(e) {
    const voteValue = e.target.value;
    this.setState({
      voteValue
    });
    // this is called from App.js
    this.props.callbackFromParent(voteValue);
  }
  render() {
    return (
      <React.Fragment>
        <div className="range">
          <h4>Average Vote: {this.state.voteValue}</h4>
          <input
            type="range"
            min="0"
            max="10"
            defaultValue="0"
            onChange={this.onRangeChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default MovieRange;
