import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from '../card/index';
import ProgressBar from '../progress_bar/index';
import './index.css';

export default class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: undefined };
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
    const { match } = this.props;
    fetch(`${process.env.PUBLIC_URL}/decks/${match.params.deckId}.json`)
      .then(response => response.json())
      .then(deck => this.setState({ deck }))
      .catch(error => this.setState({ error }));
  }

  render() {
    const { error, deck } = this.state;

    return (
      (error && <ErrorScreen />) ||
      (deck && this.renderDeck()) ||
      <h1> Loading ... </h1>
    );
  }

  renderDeck() {
    const { deckId, cardIndex } = this.props.match.params;
    const { cards } = this.state.deck;
    const activeCardIndex = parseInt(cardIndex, 10) - 1;
    const displayedCards = this._getDisplayedCards(cards, activeCardIndex);

    return (
      <div className="container--deck">
        <ProgressBar currentIndex={activeCardIndex + 1} length={cards.length} />

        {false &&
          <div>
            {this.hasPrevious() &&
              <Link to={`/decks/${deckId}/cards/${activeCardIndex}`}>
                {' '}{'<<'}{' '}
              </Link>}{' '}
            {this.hasNext() &&
              <Link to={`/decks/${deckId}/cards/${activeCardIndex + 2}`}>
                {' '}>>{' '}
              </Link>}
          </div>}

        {displayedCards}
      </div>
    );
  }

  hasPrevious() {
    const { cardIndex } = this.props.match.params;
    return cardIndex > 1;
  }

  hasNext() {
    const { cards } = this.state.deck;
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
    const SPACE = 32;
    switch (event.keyCode) {
      case SPACE:
        this.nextCard();
        break;
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
