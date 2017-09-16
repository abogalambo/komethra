/*
 * action types
 */

export const DEPLOY_DECK = 'DEPLOY_DECK';

/*
 * action creators
 */

export function deployDeck(deck, error) {
  return { type: DEPLOY_DECK, deck, error };
}
