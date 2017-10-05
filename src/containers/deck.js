import { connect } from 'react-redux';
import { deployDeck, goToCard, flipCard } from '../actions';
import DeckComponent from '../components/deck/index';

const mapStateToProps = (state, ownProps) => {
  const { deckId } = ownProps;
  const { decksMap } = state;
  const { error, cards, cardIndex, currentCardIsFlipped } =
    decksMap[deckId] || {};
  return { error, cards, deckId, cardIndex, currentCardIsFlipped };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { deckId } = ownProps;
  return {
    loadDeck: () => {
      return fetch(`${process.env.PUBLIC_URL}/decks/${deckId}.json`)
        .then(response => response.json())
        .then(deck => dispatch(deployDeck(deckId, deck)))
        .catch(error => dispatch(deployDeck(deckId, { error })));
    },
    goToCard: cardIndex => {
      dispatch(goToCard(cardIndex));
    },
    flipCard: () => {
      dispatch(flipCard());
    }
  };
};

const DeckContainer = connect(mapStateToProps, mapDispatchToProps)(
  DeckComponent
);

export default DeckContainer;
