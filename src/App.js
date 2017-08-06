import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/home/index';
import Lesson from './components/lesson/index';

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
            <Route path="/lessons/:lessonId/" component={Lesson} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
