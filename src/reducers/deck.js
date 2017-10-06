import { GO_TO_CARD, FLIP_CARD, ANSWER_QUESTION } from '../actions';

const DEFAULT_DECK_ATTRIBUTES = { cardIndex: 0 };
const DEFAULT_REMAINING = 3;

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
      const selectedAnswer = question.answers[answerIndex];
      const currentRemaining = question.remaining || DEFAULT_REMAINING;
      const remaining = selectedAnswer.correct
        ? currentRemaining - 1
        : DEFAULT_REMAINING;
      const newQuestion = Object.assign({}, question, { selectedAnswer });
      const newCardFace = Object.assign({}, cardFace, {
        question: newQuestion
      });

      const updatedDeck = updateCard(
        state,
        { [cardSide]: newCardFace },
        cardIndex
      );

      if (remaining < 1) return updatedDeck;

      const newQuestion2 = Object.assign({}, question, { remaining });
      const newCardFace2 = Object.assign({}, cardFace, {
        question: newQuestion2
      });
      return insertCard(
        updatedDeck,
        Object.assign({}, card, { [cardSide]: newCardFace2 }),
        Math.min(cardIndex + 5, cards.length)
      );
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
    return index === cardIndex
      ? Object.assign({}, card, newCardAttributes)
      : card;
  });
  return Object.assign({}, deck, { cards });
}

function insertCard(deck, newCardAttributes, cardIndex) {
  const { cards } = deck;
  const newCards = [
    ...cards.slice(0, cardIndex),
    newCardAttributes,
    ...cards.slice(cardIndex + 1, cards.length)
  ];

  return Object.assign({}, deck, { cards: newCards });
}
