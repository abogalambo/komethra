import { connect } from 'react-redux';
import { deployDeck, goToCard } from '../actions';
import DeckComponent from '../components/deck/index';

const mapStateToProps = (state, ownProps) => {
  const { deckId } = ownProps.match.params;
  const { decksMap } = state;
  const { deck, cardIndex } = decksMap[deckId] || {};
  return { deck, deckId, cardIndex };
};

const mapDispatchToProps = dispatch => {
  return {
    loadDeck: deckId => {
      fetch(`${process.env.PUBLIC_URL}/decks/${deckId}.json`)
        .then(response => response.json())
        .then(deck => dispatch(deployDeck(deckId, deck)))
        .catch(error => dispatch(deployDeck(deckId, { deck: { error } })));
    },
    goToCard: (deckId, cardIndex) => {
      dispatch(goToCard(deckId, cardIndex));
    }
  };
};

const DeckContainer = connect(mapStateToProps, mapDispatchToProps)(
  DeckComponent
);

export default DeckContainer;
