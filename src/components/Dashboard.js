import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";

import PollPreview from "./PollPreview";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  questionType: {
    marginTop: 30
  }
});

const _getUnansweredIds = (questions, authedUser) => {
  return Object.keys(questions)
    .filter(id => {
      return (
        !questions[id].optionOne.votes.includes(authedUser) &&
        !questions[id].optionTwo.votes.includes(authedUser)
      );
    })
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);
};

const _getAnsweredIds = (questions, authedUser) => {
  return Object.keys(questions)
    .filter(id => {
      return (
        questions[id].optionOne.votes.includes(authedUser) ||
        questions[id].optionTwo.votes.includes(authedUser)
      );
    })
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);
};

const mapStateToProps = ({ questions, authedUser }) => {
  return {
    unansweredQuestionIds: _getUnansweredIds(questions, authedUser),
    answeredQuestionIds: _getAnsweredIds(questions, authedUser)
  };
};

class Dashboard extends Component {
  state = {
    showAnswered: false
  };

  handleToggle = toggle => {
    this.setState(() => ({
      showAnswered: toggle
    }));
  };

  render() {
    const { classes, unansweredQuestionIds, answeredQuestionIds } = this.props;
    const { showAnswered } = this.state;
    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid
            className={classes.questionType}
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={16}
          >
            <Button
              variant={showAnswered ? "outlined" : "contained"}
              color="primary"
              onClick={() => {
                this.handleToggle(false);
              }}
            >
              Unanswered Questions
            </Button>
            <Button
              variant={showAnswered ? "contained" : "outlined"}
              color="primary"
              onClick={() => {
                this.handleToggle(true);
              }}
            >
              Answered Questions
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={8}
          >
            {showAnswered === true
              ? answeredQuestionIds.map(id => (
                  <Grid key={id} item>
                    <PollPreview id={id} />
                  </Grid>
                ))
              : unansweredQuestionIds.map(id => (
                  <Grid key={id} item>
                    <PollPreview id={id} />
                  </Grid>
                ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Dashboard));
