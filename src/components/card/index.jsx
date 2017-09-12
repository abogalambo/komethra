import React, { Component } from 'react';
import './index.css';
import CardFace from '../card_face/index';
import classNames from 'classnames';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { isFlipped: false };
    this.flip = this.flip.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', this._handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleKeyDown);
  }

  render() {
    const { card, current, onClick } = this.props;
    const { front, back } = card;
    const { isFlipped } = this.state;
    return (
      <div className="container--card" style={this.style()}>
        {this.shouldRenderCard() &&
          <div
            className={classNames('card', { flipped: isFlipped })}
            onClick={onClick}
          >
            {front && <CardFace side="front" {...front} />}
            {back && <CardFace side="back" {...back} />}
          </div>}
      </div>
    );
  }

  _handleKeyDown(event) {
    const SPACE = 32;
    if (event.keyCode == SPACE) {
      this.flip();
    }
  }

  flip() {
    const { current, card } = this.props;
    if (card.back && current) {
      this.setState({ isFlipped: !this.state.isFlipped });
    }
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
