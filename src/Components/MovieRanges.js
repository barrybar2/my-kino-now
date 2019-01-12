import React, { Component } from "react";

class MovieRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popValue: 0
    };
    this.onRangeChange = this.onRangeChange.bind(this);
  }
  onRangeChange(e) {
    const popValue = e.target.value;
    this.setState({
      popValue
    });
    this.props.callbackFromParent(popValue);
  }
  render() {
    return (
      <React.Fragment>
        <h4>Average Vote: {this.state.popValue}</h4>
        <input
          type="range"
          min="0"
          max="10"
          defaultValue="0"
          onChange={this.onRangeChange}
        />
      </React.Fragment>
    );
  }
}

export default MovieRange;
