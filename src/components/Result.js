import React, { Component} from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from "@material-ui/core";

import Vote from "./Vote";

const styles = theme => ({
  questionType: {
    marginTop: 30
  },
  card: {
    minWidth: 400
  },
  avatar: {
    margin: 5,
    width: 80,
    height: 80
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

class Result extends Component {
  render() {
    const { authedUser, author, classes } = this.props;
    const {optionOne, optionTwo} = this.props.question;
    const totalVotes = optionOne.votes.length + optionTwo.votes.length;
    
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="subheading" gutterBottom={true}>
            Results
          </Typography>
          <Divider />
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <Avatar
                alt={author && author.name}
                src={author && author.avatarURL}
                className={classes.avatar}
              />
            </Grid>
            <Grid item xs={9}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="stretch"
              >
                <Vote
                  active={optionOne.votes.includes(authedUser)}
                  text={optionOne.text}
                  votes={optionOne.votes.length}
                  totalVotes={totalVotes}
                />
                <Vote
                  active={optionTwo.votes.includes(authedUser)}
                  text={optionTwo.text}
                  votes={optionTwo.votes.length}
                  totalVotes={totalVotes}
                />
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

Result.propTypes = {
  qid: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Result));
