import React, { Component } from "react";
import { connect } from "react-redux";

import Question from "./Question";
import Result from "./Result";

const mapStateToProps = ({ questions, authedUser }, props) => {
  const { id } = props.match.params;
  const question = questions[id];
  return {
    id,
    question,
    authedUser
  };
};

const _isQuestionAnsweredFor = (question, authedUser) => {
  return (
    question &&
    (question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser))
  );
};

class Poll extends Component {
  render() {
    const { question, authedUser, id } = this.props;
    return _isQuestionAnsweredFor(question, authedUser) 
            ? (<Result qid={id} />) 
            : (<Question qid={id} />);
  }
}

export default connect(mapStateToProps)(Poll);
