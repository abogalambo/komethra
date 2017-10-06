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
      const { cards, cardIndex, currentCardIsFlipped } = state;
      const card = cards[cardIndex];
      const cardSide = currentCardIsFlipped ? 'back' : 'front';
      const cardFace = card[cardSide];
      const { question } = cardFace;
      if (question.selectedAnswer) return state;

      const { answerIndex } = action;
      const newQuestion = Object.assign({}, question, {
        selectedAnswer: question.answers[answerIndex]
      });
      const newCardFace = Object.assign({}, cardFace, {
        question: newQuestion
      });

      return updateCard(state, { [cardSide]: newCardFace }, cardIndex);
    }

    default:
      return Object.assign({}, DEFAULT_DECK_ATTRIBUTES, state);
  }
}

function cardWithinBounds(cardIndex, deck) {
  return cardIndex >= 0 && cardIndex < cardIndexLimit(deck);
}

function cardIndexLimit(deck) {
  return deck.cards.reduce((limit, card, index) => {
    if (card.front.question && !card.front.question.selectedAnswer) {
      return Math.min(limit, index + 1);
    }
    return limit;
  }, deck.cards.length);
}

function updateCard(deck, newCardAttributes, cardIndex) {
  const cards = deck.cards.map((card, index) => {
    if (index === cardIndex) {
      return Object.assign({}, card, newCardAttributes);
    } else {
      return card;
    }
  });
  return Object.assign({}, deck, { cards });
}
