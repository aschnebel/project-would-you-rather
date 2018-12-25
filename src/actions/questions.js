import { saveQuestionAnswer, saveQuestion } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

export const receiveQuestions = questions => {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
};

const answerQuestion = ({ authedUser, qid, answer }) => {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer
  };
};

export const handleAnswerQuestion = info => {
  return dispatch => {
    dispatch(showLoading());
    return saveQuestionAnswer(info)
      .then(() => dispatch(answerQuestion(info)))
      .then(() => dispatch(hideLoading()))
      .catch(e => {
        console.warn("Error in handleAnswerQuestion: ", e);
        alert("The was an error answering the question. Try again.");
      });
  };
};

const addQuestion = question => {
  return {
    type: ADD_QUESTION,
    question
  };
};

export const handleAddQuestion = question => {
  return dispatch => {
    dispatch(showLoading());
    return saveQuestion(question)
      .then(question => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
      .catch(e => {
        console.warn("Error in handleAddQuestion: ", e);
        alert("The was an error creating the question. Try again.");
      });
  };
};
