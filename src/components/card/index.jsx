import React, { Component } from 'react';
import './index.css';
import CardFace from '../card_face/index';
import classNames from 'classnames';

export default class Card extends Component {
  render() {
    const { card, current, onClick, isFlipped, _key } = this.props;
    const { front, back } = card;
    return (
      <div className="container--card" onClick={this.flip} style={this.style()}>
        {this.shouldRenderCard() &&
          <div
            className={classNames('card', { flipped: isFlipped })}
            onClick={onClick}
          >
            {front &&
              <CardFace
                side="front"
                _key={`${_key}-front`}
                current={current && !isFlipped}
                {...front}
              />}
            {back &&
              <CardFace
                side="back"
                _key={`${_key}-back`}
                current={current && isFlipped}
                {...back}
              />}
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
