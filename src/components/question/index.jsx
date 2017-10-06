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
    this.correctSound = new Sound(correctAudio);
    this.incorrectSound = new Sound(incorrectAudio);
  }

  componentWillReceiveProps(nextProps) {
    const oldAnswer = this.props.selectedAnswer;
    const newAnswer = nextProps.selectedAnswer;

    if (!oldAnswer && newAnswer) {
      if (newAnswer.correct) {
        this.correctSound.play();
      } else {
        this.incorrectSound.play();
      }
    }
  }

  render() {
    const { head, active, selectedAnswer } = this.props;
    const { audio } = head;
    const answers = this.renderAnswers();
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
    const { answers, selectedAnswer, _key } = this.props;
    return answers.map((answer, index) => {
      const { image } = answer;
      const isSelected = selectedAnswer === answer;
      const isIncorrect = isSelected && !selectedAnswer.correct;

      return (
        <div
          key={`answer-${index}-${_key}`}
          className={classNames('answer', { selected: isSelected })}
          onClick={this._answerHandler(answer)}
        >
          {image && <img alt="" src={image} />}
          {selectedAnswer && answer.correct && <span>✔</span>}
          {isIncorrect && <span>✘</span>}
        </div>
      );
    });
  }

  _answerHandler(answer) {
    return () => this.answer(answer);
  }

  answer(answer) {
    this.props.answer(answer);
  }
}
