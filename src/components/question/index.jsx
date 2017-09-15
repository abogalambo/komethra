import React, { Component } from 'react';
import Audio from '../audio/index';
import './index.css';

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.answer = this.answer.bind(this);
    this.answerHandler = this.answerHandler.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
  }

  render() {
    const { head, active } = this.props;
    const { audio } = head;
    const answers = this.renderAnswers();
    return (
      <div className="question">
        <div className="head">
          {audio && <Audio url={audio.url} active={active} autoplay />}
        </div>
        <div className="answers">
          {answers}
        </div>
      </div>
    );
  }

  renderAnswers() {
    const { answers } = this.props;
    return answers.map(answer => {
      const { image } = answer;
      return (
        image && <img alt="" src={image} onClick={this.answerHandler(answer)} />
      );
    });
  }

  answerHandler(answer) {
    return () => this.answer(answer);
  }

  answer(answer) {
    console.log('user answered with', answer);
  }
}
