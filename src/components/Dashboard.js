import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Button, Grid } from "@material-ui/core";

import PollPreview from "./PollPreview";

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
    const { unansweredQuestionIds, answeredQuestionIds } = this.props;
    const { showAnswered } = this.state;
    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(Dashboard);
