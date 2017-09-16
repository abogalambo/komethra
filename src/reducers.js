import { combineReducers } from 'redux';
import { DEPLOY_DECK } from './actions';

function deck(state = null, action) {
  switch (action.type) {
    case DEPLOY_DECK:
      return action.deck;
    default:
      return state;
  }
}

const reducer = combineReducers({
  deck
});

export default reducer;
