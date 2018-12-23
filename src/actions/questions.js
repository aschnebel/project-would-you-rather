import { saveQuestionAnswer } from "../utils/api";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";

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
    return saveQuestionAnswer(info)
      .then(() => dispatch(answerQuestion(info)))
      .catch(e => {
        console.warn("Error in handleToggleTweet: ", e);
        alert("The was an error answering the question. Try again.");
      });
  };
};
