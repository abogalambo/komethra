import { combineReducers } from 'redux';
import { DEPLOY_DECK, ANSWER_QUESTION } from '../actions';
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

function questions(state = {}, action) {
  switch (action.type) {
    case ANSWER_QUESTION:
      const { questionKey, answerIndex } = action;
      if (state[questionKey]) return state; // already answered
      return Object.assign({}, state, { [questionKey]: { answerIndex } });

    default:
      return state;
  }
}

const reducer = combineReducers({
  decksMap,
  questions
});

export default reducer;
