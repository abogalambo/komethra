import { combineReducers } from 'redux';
import { DEPLOY_DECK } from '../actions';
import activeDeck from './deck';

function decksMap(state = {}, action) {
  if (action.type === DEPLOY_DECK) {
    const { deckId } = action;

    return Object.assign({}, state, {
      [deckId]: activeDeck(action.deck, action),
      activeDeckId: deckId
    });
  } else {
    const { activeDeckId } = state;

    return Object.assign({}, state, {
      [activeDeckId]: activeDeck(state[activeDeckId], action)
    });
  }
}

const reducer = combineReducers({
  decksMap
});

export default reducer;
