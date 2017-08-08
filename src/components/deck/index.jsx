import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
// import './index.css';

export default class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: undefined };
  }

  componentDidMount() {
    const { match } = this.props;
    fetch(`${process.env.PUBLIC_URL}/decks/${match.params.deckId}.json`)
      .then(response => response.json())
      .then(deck => this.setState({ deck: deck }))
      .catch(error => this.setState({ error: error }));
  }

  render() {
    const { match } = this.props;
    const slideLinks = [1, 2, 3, 4].map(index =>
      <li>
        <Link to={`${match.url}/slides/${index}`}>
          {' '}Go to slide {index}{' '}
        </Link>
      </li>
    );
    return (
      <div>
        <h2>
          Deck {match.params.deckId}
        </h2>
        <ul>
          {' '}{slideLinks}{' '}
        </ul>
        <Route path={`${match.url}/slides/:slideId`} component={Slide} />
      </div>
    );
  }
}

const Slide = ({ match }) =>
  <div>
    <h2>
      Slide {match.params.slideId}
    </h2>
  </div>;
