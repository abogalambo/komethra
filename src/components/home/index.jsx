import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './index.css';

export default class Home extends Component {
  render() {
    return (
      <div>
        <h2>Home</h2>
        <Link to="/decks/1">Start learning now!</Link>
      </div>
    );
  }
}
