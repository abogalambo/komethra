import React, { Component } from 'react';
import Deck from '../containers/deck';

export default class RoutedDeck extends Component {
  constructor(props) {
    super(props);
    this.updateRoute = this.updateRoute.bind(this);
  }

  render() {
    const { deckId, cardIndex } = this.props.match.params;
    return (
      <Deck
        deckId={deckId}
        initialCardIndex={cardIndex - 1}
        onCardTransition={this.updateRoute}
      />
    );
  }

  updateRoute(newCardIndex) {
    const { deckId } = this.props.match.params;
    this.props.history.push(`/decks/${deckId}/cards/${newCardIndex + 1}`);
  }
}
