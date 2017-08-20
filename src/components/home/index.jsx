import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="home__container vert-center">
          <div className="home__content">
            <header className="home__header">
              <h1 className="header__title">Komethra</h1>
              <h2 className="header__title--ar">كمثرى</h2>
            </header>
            <Link className="btn btn--primary" to="/decks/1/cards/1">
              Learn now!
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
