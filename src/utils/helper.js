export const getUnansweredIds = (questions, authedUser) => {
  return Object.keys(questions)
    .filter(id => {
      return (
        !questions[id].optionOne.votes.includes(authedUser) &&
        !questions[id].optionTwo.votes.includes(authedUser)
      );
    })
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);
};

export const getAnsweredIds = (questions, authedUser) => {
  return Object.keys(questions)
    .filter(id => {
      return (
        questions[id].optionOne.votes.includes(authedUser) ||
        questions[id].optionTwo.votes.includes(authedUser)
      );
    })
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);
};

export const isQuestionAnsweredFor = (question, authedUser) => {
  return (
    question &&
    (question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser))
  );
};
