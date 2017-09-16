/*
 * action types
 */

export const DEPLOY_DECK = 'DEPLOY_DECK';
export const GO_TO_CARD = 'GO_TO_CARD';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

/*
 * action creators
 */

export function deployDeck(deckId, deck) {
  return { type: DEPLOY_DECK, deckId, deck };
}

export function goToCard(deckId, cardIndex) {
  return { type: GO_TO_CARD, deckId, cardIndex };
}

export function answerQuestion(answer) {
  return { type: ANSWER_QUESTION, answer };
}
