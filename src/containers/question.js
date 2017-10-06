import { connect } from 'react-redux';
import { answerQuestion } from '../actions';
import QuestionComponent from '../components/question/index';

const mapDispatchToProps = (dispatch, ownProps) => {
  const { _key, answers } = ownProps;
  return {
    answer: answer => {
      const answerIndex = answers.indexOf(answer);
      dispatch(answerQuestion(_key, answerIndex));
    }
  };
};

const QuestionContainer = connect(undefined, mapDispatchToProps)(
  QuestionComponent
);

export default QuestionContainer;
