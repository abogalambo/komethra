import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './reset.css';
import './index.css';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/decks_map';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
