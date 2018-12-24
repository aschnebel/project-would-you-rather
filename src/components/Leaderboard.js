import React, { Component } from "react";
import { connect } from "react-redux";

import { Grid } from "@material-ui/core";

import UserScore from "./UserScore";

const mapStateToProps = ({ users, questions }) => {
  Object.keys(users).map(uid => {
    const createdQuestions = Object.keys(questions).filter(
      qid => questions[qid].author === uid
    ).length;
    const answeredQuestions = Object.keys(questions).filter(qid => {
      return (
        questions[qid].optionOne.votes.includes(uid) ||
        questions[qid].optionTwo.votes.includes(uid)
      );
    }).length;
    return (users[uid] = {
      ...users[uid],
      createdQuestions: createdQuestions,
      answeredQuestions: answeredQuestions,
      score: createdQuestions + answeredQuestions
    });
  });

  return {
    users,
    questions
  };
};

class Leaderboard extends Component {
  render() {
    const { users } = this.props;

    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={8}
      >
        {Object.keys(users)
          .sort((a, b) => users[b].score - users[a].score)
          .map(id => (
            <Grid key={id} item>
              <UserScore
                id={id}
                createdQuestions={users[id].createdQuestions}
                answeredQuestions={users[id].answeredQuestions}
                score={users[id].score}
              />
            </Grid>
          ))}
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(Leaderboard);
