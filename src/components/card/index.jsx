import React, { Component } from 'react';
import './index.css';
import Audio from '../audio/index';

export default class Card extends Component {
  render() {
    const { card, current } = this.props;
    return (
      <div className="container--card" style={this.style()}>
        <div className="card">
          {card.audio &&
            <Audio
              url={card.audio.url}
              active={current}
              autoplay={card.audio.autoplay}
            />}
          {card.image && <img src={card.image} />}
        </div>
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
