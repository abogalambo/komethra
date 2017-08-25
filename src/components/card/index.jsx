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
    const { preprevious, previous, current, next, nextnext } = this.props;
    if (preprevious) return { left: '-100%' };
    if (previous) return { left: '-40%' };
    if (current) return { left: '20%' };
    if (next) return { left: '80%' };
    if (nextnext) return { left: '120%' };
  }
}
