import { connect } from 'react-redux';
import { deployDeck, goToCard } from '../actions';
import DeckComponent from '../components/deck/index';

const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps;
  const { deckId } = match ? match.params : ownProps;
  const { decksMap } = state;
  const { deck, cardIndex } = decksMap[deckId] || {};

  const cardIndexProp =
    cardIndex || (match ? parseInt(match.params.cardIndex) - 1 : 0);

  return { deck, deckId, cardIndex: cardIndexProp };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadDeck: deckId => {
      fetch(`${process.env.PUBLIC_URL}/decks/${deckId}.json`)
        .then(response => response.json())
        .then(deck => dispatch(deployDeck(deckId, deck)))
        .catch(error => dispatch(deployDeck(deckId, { deck: { error } })));
    },
    goToCard: (deckId, cardIndex) => {
      dispatch(goToCard(deckId, cardIndex));
      if (ownProps.match) {
        ownProps.history.push(`/decks/${deckId}/cards/${cardIndex + 1}`);
      }
    }
  };
};

const DeckContainer = connect(mapStateToProps, mapDispatchToProps)(
  DeckComponent
);

export default DeckContainer;
