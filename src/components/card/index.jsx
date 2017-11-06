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
            style={
              current && {
                boxShadow:
                  '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
              }
            }
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
    if (preprevious) return { left: '-150%' };
    if (previous) return { left: '-70%' };
    if (current) return { left: '10%' };
    if (next) return { left: '90%' };
    if (nextnext) return { left: '160%' };
  }
}
