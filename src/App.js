import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/home/index';
import DeckContainer from './containers/deck';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/decks/:deckId/cards/:cardIndex"
              component={DeckContainer}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
