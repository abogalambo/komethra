import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/home/index';
import Deck from './components/deck/index';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to Komethra</h2>
          </div>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/decks/:deckId/cards/:cardIndex" component={Deck} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
