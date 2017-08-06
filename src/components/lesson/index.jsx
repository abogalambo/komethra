import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
// import './index.css';

export default class Lesson extends Component {
  render() {
    const { match } = this.props;
    const slideLinks = [1, 2, 3, 4].map(index =>
      <li>
        <Link to={`${match.url}/slides/${index}`}>
          {' '}Go to slide {index}{' '}
        </Link>
      </li>
    );
    console.log(this.props);
    return (
      <div>
        <h2>
          Lesson {match.params.lessonId}
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
