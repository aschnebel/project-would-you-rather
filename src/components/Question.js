import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  Button,
  FormControlLabel,
  Typography,
  RadioGroup,
  Radio
} from "@material-ui/core";

import { handleAnswerQuestion } from "../actions/questions";

const mapStateToProps = ({ questions, authedUser }, { qid }) => {
  const question = questions[qid];
  return {
    question,
    authedUser
  };
};

class Question extends Component {
  state = {
    answer: ""
  };

  handleChange = value => {
    this.setState(() => ({
      answer: value
    }));
  };

  handleSubmit = e => {
    const { dispatch, authedUser, qid } = this.props;
    const { answer } = this.state;
    e.preventDefault();
    dispatch(handleAnswerQuestion({ authedUser, qid, answer }));
  };

  render() {
    const { answer } = this.state;
    const { question } = this.props;

    return (
      <Fragment>
        <Typography variant="overline">Would you rather</Typography>

        <RadioGroup
          value={answer}
          onChange={e => this.handleChange(e.target.value)}
        >
          <FormControlLabel
            value="optionOne"
            control={<Radio color="primary" />}
            labelPlacement="end"
            label={question && question.optionOne.text}
          />
          <FormControlLabel
            value="optionTwo"
            control={<Radio color="primary" />}
            labelPlacement="end"
            label={question && question.optionTwo.text}
          />
        </RadioGroup>
        <Button
          fullWidth={true}
          color="primary"
          onClick={e => this.handleSubmit(e)}
        >
          Submit
        </Button>
      </Fragment>
    );
  }
}

Question.propTypes = {
  qid: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(Question);
