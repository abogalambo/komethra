import { GO_TO_CARD, FLIP_CARD, ANSWER_QUESTION } from '../actions';

const DEFAULT_DECK_ATTRIBUTES = { cardIndex: 0 };

export default function deck(state = {}, action) {
  switch (action.type) {
    case GO_TO_CARD: {
      if (!cardWithinBounds(action.cardIndex, state)) return state;
      const newValues = {
        cardIndex: action.cardIndex,
        currentCardIsFlipped: false
      };
      return Object.assign({}, DEFAULT_DECK_ATTRIBUTES, state, newValues);
    }

    case FLIP_CARD: {
      const { cardIndex, cards } = state;
      if (!cards[cardIndex].back) return state; // can only be flipped if it has a back side
      const newValues = { currentCardIsFlipped: !state.currentCardIsFlipped };
      return Object.assign({}, DEFAULT_DECK_ATTRIBUTES, state, newValues);
    }

    case ANSWER_QUESTION: {
      return Object.assign({}, DEFAULT_DECK_ATTRIBUTES, state);
    }

    default:
      return Object.assign({}, DEFAULT_DECK_ATTRIBUTES, state);
  }
}

function cardWithinBounds(cardIndex, deck) {
  return cardIndex >= 0 && cardIndex < deck.cards.length;
}
