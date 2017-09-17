import { combineReducers } from 'redux';
import { DEPLOY_DECK, GO_TO_CARD, FLIP_CARD, ANSWER_QUESTION } from './actions';

function decksMap(state = {}, action) {
  let newValues;
  const deckIsLoaded = state[state.activeDeckId];

  switch (action.type) {
    case DEPLOY_DECK:
      let { deckId } = action;
      newValues = { deck: action.deck };
      return Object.assign({}, state, {
        [deckId]: newDeckEntry({}, newValues),
        activeDeckId: deckId
      });

    case GO_TO_CARD:
      if (!deckIsLoaded) return state;
      if (!cardWithinBounds(action.cardIndex, activeDeck(state))) return state;
      newValues = { cardIndex: action.cardIndex, currentCardIsFlipped: false };
      return Object.assign({}, state, {
        [state.activeDeckId]: newDeckEntry(activeDeck(state), newValues)
      });

    case FLIP_CARD:
      if (!deckIsLoaded) return state;
      if (!canFlipCard(state)) return state;
      newValues = {
        currentCardIsFlipped: !activeDeck(state).currentCardIsFlipped
      };
      return Object.assign({}, state, {
        [state.activeDeckId]: newDeckEntry(activeDeck(state), newValues)
      });

    default:
      return state;
  }
}

function activeDeck(decksMap) {
  return decksMap[decksMap.activeDeckId];
}

function canFlipCard(decksMap) {
  if (!activeDeck(decksMap)) return false;
  const { deck, cardIndex } = activeDeck(decksMap);
  return deck.cards[cardIndex].back; // can only be flipped if it has a back side
}

function cardWithinBounds(cardIndex, deckEntry) {
  return cardIndex >= 0 && cardIndex < deckEntry.deck.cards.length;
}

function newDeckEntry(oldDeckEntry = {}, newValues) {
  const defaultValues = { cardIndex: 0 };
  return Object.assign({}, defaultValues, oldDeckEntry, newValues);
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
