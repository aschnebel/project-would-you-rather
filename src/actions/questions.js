import { saveQuestionAnswer, saveQuestion } from "../utils/api";

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
    return saveQuestionAnswer(info)
      .then(() => dispatch(answerQuestion(info)))
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
  }
}

export const handleAddQuestion = question => {
  return dispatch => {
    return saveQuestion(question)
      .then(question => dispatch(addQuestion(question)))
      .catch(e => {
        console.warn("Error in handleAddQuestion: ", e);
        alert("The was an error creating the question. Try again.");
      })
  }
}

