import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from '../card/index';
// import './index.css';

export default class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: undefined };
  }

  componentDidMount() {
    const { match } = this.props;
    fetch(`${process.env.PUBLIC_URL}/decks/${match.params.deckId}.json`)
      .then(response => response.json())
      .then(deck => this.setState({ deck: deck }))
      .catch(error => this.setState({ error: error }));
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
    const { cards, title } = this.state.deck;
    const activeCardIndex = parseInt(cardIndex, 10);
    return (
      <div>
        <h1>
          {' '}{title}{' '}
        </h1>

        <div>
          {this.hasPrevious() &&
            <Link to={`/decks/${deckId}/cards/${activeCardIndex - 1}`}>
              {' '}{'<<'}{' '}
            </Link>}{' '}
          {this.hasNext() &&
            <Link to={`/decks/${deckId}/cards/${activeCardIndex + 1}`}>
              {' '}>>{' '}
            </Link>}
        </div>

        {this.hasPrevious() &&
          <Card
            card={cards[activeCardIndex - 2]}
            previous
            key={`card-${activeCardIndex - 2}`}
          />}

        <Card
          card={cards[activeCardIndex - 1]}
          current
          key={`card-${activeCardIndex - 1}`}
        />

        {this.hasNext() &&
          <Card
            card={cards[activeCardIndex]}
            next
            key={`card-${activeCardIndex}`}
          />}
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
}

const ErrorScreen = () =>
  <div>
    <h2> Sorry something went wrong. Please try again </h2>
  </div>;
