import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import {
  Button,
  FormControlLabel,
  Typography,
  RadioGroup,
  Radio
} from "@material-ui/core";

const mapStateToProps = ({questions, authedUser}, {id}) => {
  const question = questions[id];
  return {
    question,
    authedUser
  }
}

class Question extends Component {
  state = {
    value: ""
  };

  handleChange = value => {
    this.setState(() => ({
      value: value
    }));
  };

  render() {
    const { value } = this.state;
    const { question } = this.props;

    return (
      <Fragment>
        <Typography variant="overline">Would you rather</Typography>

        <RadioGroup
          value={value}
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
        <Button fullWidth={true} color="primary">
          Submit
        </Button>
      </Fragment>
    );
  }
}

Question.propTypes = {
  id: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(Question);
