import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    const { match, loadDeck } = this.props;
    loadDeck(match.params.deckId);
  }

  render() {
    const { deck } = this.props;

    return (
      (deck && deck.error && <ErrorScreen />) ||
      (deck && this.renderDeck()) ||
      <h1> Loading ... </h1>
    );
  }

  renderDeck() {
    const { cardIndex } = this.props;
    const { cards } = this.props.deck;
    const displayedCards = this._getDisplayedCards(cards, cardIndex);

    return (
      <div className="container--deck">
        <ProgressBar currentIndex={cardIndex + 1} length={cards.length} />
        {displayedCards}
      </div>
    );
  }

  hasPrevious() {
    const { cardIndex } = this.props;
    return cardIndex > 0;
  }

  hasNext() {
    const { deck, cardIndex } = this.props;
    return cardIndex < deck.cards.length - 1;
  }

  nextCard() {
    const { cardIndex, match, goToCard } = this.props;
    const { deckId } = match.params;
    if (this.hasNext()) {
      goToCard(deckId, cardIndex + 1);
    }
  }

  previousCard() {
    const { cardIndex, match, goToCard } = this.props;
    const { deckId } = match.params;
    if (this.hasPrevious()) {
      goToCard(deckId, cardIndex - 1);
    }
  }

  _handleKeyDown(event) {
    const ARROW_LEFT = 37;
    const ARROW_RIGHT = 39;
    switch (event.keyCode) {
      case ARROW_RIGHT:
        this.nextCard();
        break;
      case ARROW_LEFT:
        this.previousCard();
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
      '1': this.nextCard
    };

    return [-2, -1, 0, 1, 2]
      .map(offset => activeIndex + offset)
      .filter(index => cards[index])
      .map(index => ({
        card: cards[index],
        key: `card-${index}`,
        onClick: handlers[index - activeIndex],
        [positions[index - activeIndex + 2]]: true // e.g previous: true
      }))
      .map(props => <Card {...props} />);
  }
}

const ErrorScreen = () =>
  <div>
    <h2> Sorry something went wrong. Please try again </h2>
  </div>;
