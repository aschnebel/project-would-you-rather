import React from "react";
import { connect } from "react-redux";

import Question from "./Question";
import Result from "./Result";
import PollNotFound from './PollNotFound';

import { isQuestionAnsweredFor } from '../utils/helper';

const mapStateToProps = ({ questions, authedUser }, props) => {
  const { id } = props.match.params;
  const question = questions[id];
  return {
    id,
    question,
    authedUser
  };
};

const Poll = ({authedUser, id, question}) => (
  question 
    ? isQuestionAnsweredFor(question, authedUser) 
        ? <Result qid={id} />
        : <Question qid={id} />
    : <PollNotFound />
)

export default connect(mapStateToProps)(Poll);
