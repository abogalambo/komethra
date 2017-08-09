import React, { Component } from 'react';
import './index.css';

export default class Card extends Component {
  render() {
    const { card } = this.props;
    return (
      <div className="card" style={this.style()}>
        <h2>
          {card.text}
        </h2>
      </div>
    );
  }

  style() {
    const { previous, next, current } = this.props;
    if (previous) return { left: '-100%' };
    if (current) return { left: '0' };
    if (next) return { left: '100%' };
  }
}
