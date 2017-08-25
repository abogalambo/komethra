import React, { Component } from 'react';
import './index.css';

export default class ProgressBar extends Component {
  render() {
    return (
      <div className="container--progress-bar">
        <div className="progress-bar">
          <div style={this.style()} />
        </div>
      </div>
    );
  }

  style() {
    const { currentIndex, length } = this.props;
    return { width: `${currentIndex / length * 100}%` };
  }
}
