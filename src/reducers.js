import { combineReducers } from 'redux';
import { DEPLOY_DECK, GO_TO_CARD } from './actions';

function newDeckEntry(oldDeckEntry, deckId, newValues) {
  let defaultEntry = { cardIndex: 0 };
  return Object.assign(defaultEntry, oldDeckEntry, newValues);
}

function decksMap(state = {}, action) {
  let newValues;
  const { deckId } = action;
  const oldDeckEntry = state[deckId];

  switch (action.type) {
    case DEPLOY_DECK:
      newValues = { deck: action.deck };
      return Object.assign({}, state, {
        [deckId]: newDeckEntry(oldDeckEntry, deckId, newValues)
      });
    case GO_TO_CARD:
      if (cardWithinBounds(action.cardIndex, oldDeckEntry)) {
        newValues = { cardIndex: action.cardIndex };
        return Object.assign({}, state, {
          [deckId]: newDeckEntry(oldDeckEntry, deckId, newValues)
        });
      }
    default:
      return state;
  }
}

function cardWithinBounds(cardIndex, deckEntry) {
  return cardIndex >= 0 && cardIndex < deckEntry.deck.cards.length;
}

const reducer = combineReducers({
  decksMap
});

export default reducer;
