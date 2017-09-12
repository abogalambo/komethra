import React, { Component } from 'react';
import './index.css';
import Audio from '../audio/index';

export default class CardFace extends Component {
  render() {
    const { side, audio, image, title, subtitle, link, current } = this.props;
    current && console.log(this.props);
    return (
      <div className={`card--face ${side}`}>
        {audio &&
          <Audio url={audio.url} active={current} autoplay={audio.autoplay} />}
        {image && <img alt="" src={image} />}
        {title &&
          <h1 className="title--card">
            {' '}{title}{' '}
          </h1>}
        {subtitle &&
          <h2 className="subtitle--card">
            {' '}{subtitle}{' '}
          </h2>}
        {link &&
          <a className="link--card" href={link.href} target="_blank">
            {link.text}
          </a>}
      </div>
    );
  }
}
