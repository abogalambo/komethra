import { connect } from 'react-redux';
import { deployDeck } from '../actions';
import Deck from '../components/deck/index';

const mapStateToProps = state => {
  const { deck, activeCardIndex } = state;
  return { deck, activeCardIndex };
};

const mapDispatchToProps = dispatch => {
  return {
    loadDeck: deckId => {
      fetch(`${process.env.PUBLIC_URL}/decks/${deckId}.json`)
        .then(response => response.json())
        .then(deck => dispatch(deployDeck(deck)))
        .catch(error => dispatch(deployDeck({ deck: { error } })));
    }
  };
};

const DeckContainer = connect(mapStateToProps, mapDispatchToProps)(Deck);

export default DeckContainer;
