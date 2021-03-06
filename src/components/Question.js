import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
  RadioGroup,
  Radio
} from "@material-ui/core";

import UserAvatar from './UserAvatar';

import { handleAnswerQuestion } from "../actions/questions";

const styles = () => ({
  card: {
    minWidth: 400
  },
  question: {
    marginLeft: 20
  }
});

const mapStateToProps = ({ questions, users, authedUser }, { qid }) => {
  const question = questions[qid];
  const author = question ? users[question.author] : null;
  return {
    question,
    author,
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
    const { classes, author, question } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="subheading" gutterBottom={true}>
            {author && author.name} asks:
          </Typography>
          <Divider />
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <UserAvatar name={author && author.name} avatarURL={author && author.avatarURL} />
            </Grid>
            <Grid item xs={9}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
              >
                <Typography variant="overline">Would you rather</Typography>

                <RadioGroup
                  value={answer}
                  className={classes.question}
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
                  fullWidth
                  color="primary"
                  variant="outlined"
                  onClick={e => this.handleSubmit(e)}
                  disabled={answer === ""}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

Question.propTypes = {
  qid: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Question));
