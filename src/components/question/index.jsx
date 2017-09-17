import React, { Component } from 'react';
import Audio from '../audio/index';
import classNames from 'classnames';
import correctAudio from '../../audio/correct.mp3';
import incorrectAudio from '../../audio/incorrect.mp3';
import Sound from '../../modules/audio.js';
import './index.css';

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.answer = this.answer.bind(this);
    this.answerHandler = this.answerHandler.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
    this.correctSound = new Sound(correctAudio);
    this.incorrectSound = new Sound(incorrectAudio);
  }

  render() {
    const { head, active } = this.props;
    const { audio } = head;
    const answers = this.renderAnswers();
    const { selectedAnswer } = this.state;
    return (
      <div className="question">
        <div className="head">
          {audio &&
            <Audio
              url={audio.url}
              active={active}
              autoplay={!selectedAnswer}
            />}
          <span>Select the right answer</span>
        </div>
        <div className="answers">
          {answers}
        </div>
      </div>
    );
  }

  renderAnswers() {
    const { answers } = this.props;
    const { selectedAnswer } = this.state;
    return answers.map(answer => {
      const { image } = answer;
      const isSelected = selectedAnswer === answer;
      const isIncorrect = isSelected && !selectedAnswer.correct;

      return (
        <div
          className={classNames('answer', { selected: isSelected })}
          onClick={this.answerHandler(answer)}
        >
          {image && <img alt="" src={image} />}
          {selectedAnswer && answer.correct && <span>✔</span>}
          {isIncorrect && <span>✘</span>}
        </div>
      );
    });
  }

  answerHandler(answer) {
    return () => this.answer(answer);
  }

  answer(answer) {
    if (this.state.selectedAnswer) return;
    this.setState({ selectedAnswer: answer });
    if (answer.correct) {
      this.correctSound.play();
    } else {
      this.incorrectSound.play();
    }
  }
}
