import React, { Component } from 'react';
import Card from '../card/index';
import ProgressBar from '../progress_bar/index';
import './index.css';

export default class Deck extends Component {
  constructor(props) {
    super(props);
    this.nextCard = this.nextCard.bind(this);
    this.previousCard = this.previousCard.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', this._handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleKeyDown);
  }

  componentDidMount() {
    const { loadDeck, initialCardIndex, goToCard } = this.props;
    loadDeck().then(() => {
      if (initialCardIndex) {
        goToCard(initialCardIndex);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { onCardTransition, cardIndex } = this.props;
    if (onCardTransition) {
      if (!isNaN(cardIndex) && cardIndex !== nextProps.cardIndex) {
        onCardTransition(nextProps.cardIndex);
      }
    }
  }

  render() {
    const { error, cards } = this.props;
    return (
      (error && <ErrorScreen />) ||
      (cards && this.renderDeck()) ||
      <h1> Loading ... </h1>
    );
  }

  renderDeck() {
    const { cardIndex, cards } = this.props;
    const displayedCards = this._getDisplayedCards(cards, cardIndex);

    return (
      <div className="container--deck">
        <ProgressBar currentIndex={cardIndex + 1} length={cards.length} />
        {displayedCards}
      </div>
    );
  }

  nextCard() {
    const { cardIndex, goToCard } = this.props;
    goToCard(cardIndex + 1);
  }

  previousCard() {
    const { cardIndex, goToCard } = this.props;
    goToCard(cardIndex - 1);
  }

  _handleKeyDown(event) {
    const ARROW_LEFT = 37;
    const ARROW_RIGHT = 39;
    const SPACE = 32;
    switch (event.keyCode) {
      case ARROW_RIGHT:
        this.nextCard();
        break;
      case ARROW_LEFT:
        this.previousCard();
        break;
      case SPACE:
        this.props.flipCard();
        break;
      default:
        break;
    }
  }

  _getDisplayedCards(cards, activeIndex) {
    const positions = [
      'preprevious',
      'previous',
      'current',
      'next',
      'nextnext'
    ];

    const handlers = {
      '-1': this.previousCard,
      '0': this.props.flipCard,
      '1': this.nextCard
    };

    return [-2, -1, 0, 1, 2]
      .map(offset => activeIndex + offset)
      .filter(index => cards[index])
      .map(index => ({
        card: cards[index],
        key: `card-${index}`,
        _key: `card-${index}`,
        onClick: handlers[index - activeIndex],
        isFlipped: index === activeIndex && this.props.currentCardIsFlipped,
        [positions[index - activeIndex + 2]]: true // e.g previous: true
      }))
      .map(props => <Card {...props} />);
  }
}

const ErrorScreen = () =>
  <div>
    <h2> Sorry something went wrong. Please try again </h2>
  </div>;
