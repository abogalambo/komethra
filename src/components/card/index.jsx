import React, { Component } from 'react';
import './index.css';
import Audio from '../audio/index';

export default class Card extends Component {
  render() {
    const { card, current, onClick } = this.props;
    return (
      <div className="container--card" style={this.style()}>
        {this.shouldRenderCard() &&
          <div className="card" onClick={onClick}>
            {card.audio &&
              <Audio
                url={card.audio.url}
                active={current}
                autoplay={card.audio.autoplay}
              />}
            {card.image && <img alt="" src={card.image} />}
          </div>}
      </div>
    );
  }

  shouldRenderCard() {
    const { preprevious, nextnext } = this.props;
    return !preprevious && !nextnext;
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
