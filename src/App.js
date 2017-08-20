import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/home/index';
import Deck from './components/deck/index';
import Static from './components/static/index';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/static" component={Static} />
            <Route exact path="/" component={Home} />
            <Route path="/decks/:deckId/cards/:cardIndex" component={Deck} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
