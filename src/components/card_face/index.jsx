import React, { Component } from 'react';
import './index.css';
import Audio from '../audio/index';
import Question from '../../containers/question';

export default class CardFace extends Component {
  render() {
    const {
      side,
      audio,
      image,
      title,
      subtitle,
      link,
      current,
      question,
      _key
    } = this.props;
    return (
      <div className={`card--face ${side}`}>
        {audio &&
          <Audio url={audio.url} active={current} autoplay={audio.autoplay} />}
        {image && <img alt="" src={image} />}
        {title &&
          <h1 className="card--title">
            {' '}{title}{' '}
          </h1>}
        {subtitle &&
          <h2 className="card--subtitle">
            {' '}{subtitle}{' '}
          </h2>}
        {link &&
          <a
            className="card--link"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.text}
          </a>}
        {question &&
          <Question {...question} active={current} _key={`question-${_key}`} />}
      </div>
    );
  }
}
