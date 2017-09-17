import { connect } from 'react-redux';
import { answerQuestion } from '../actions';
import QuestionComponent from '../components/question/index';

const mapStateToProps = (state, ownProps) => {
  const { _key, answers } = ownProps;
  const { questions } = state;
  const selectedAnswerIndex = (questions[_key] || {}).answerIndex;
  const selectedAnswer = answers[selectedAnswerIndex];
  return { selectedAnswer };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { _key, answers } = ownProps;
  return {
    answer: answer => {
      const answerIndex = answers.indexOf(answer);
      dispatch(answerQuestion(_key, answerIndex));
    }
  };
};

const QuestionContainer = connect(mapStateToProps, mapDispatchToProps)(
  QuestionComponent
);

export default QuestionContainer;
