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
    const { deckId, cardIndex } = this.props.match.params;
    const { cards } = this.props.deck;
    const activeCardIndex = parseInt(cardIndex, 10) - 1;
    const displayedCards = this._getDisplayedCards(cards, activeCardIndex);

    return (
      <div className="container--deck">
        <ProgressBar currentIndex={activeCardIndex + 1} length={cards.length} />
        {displayedCards}
      </div>
    );
  }

  hasPrevious() {
    const { cardIndex } = this.props.match.params;
    return cardIndex > 1;
  }

  hasNext() {
    const { cards } = this.props.deck;
    const { cardIndex } = this.props.match.params;
    return cardIndex < cards.length;
  }

  nextCard() {
    const { deckId, cardIndex } = this.props.match.params;
    const activeCardIndex = parseInt(cardIndex, 10);
    if (this.hasNext()) {
      this.props.history.push(`/decks/${deckId}/cards/${activeCardIndex + 1}`);
    }
  }

  previousCard() {
    const { deckId, cardIndex } = this.props.match.params;
    const activeCardIndex = parseInt(cardIndex, 10);
    if (this.hasPrevious()) {
      this.props.history.push(`/decks/${deckId}/cards/${activeCardIndex - 1}`);
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
