import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from "@material-ui/core";
import UserAvatar from "./UserAvatar";

const styles = theme => ({
  card: {
    minWidth: 400
  },
  question: {
    marginLeft: 20
  }
});

const mapStateToProps = ({ questions, users, authedUser }, { id }) => {
  const question = questions[id];
  const author = users[question.author];
  return {
    question,
    author,
    authedUser
  };
};

class PollPreview extends Component {
  toPoll = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/questions/${id}`);
  };

  render() {
    const { classes, author, question, id } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="subheading" gutterBottom={true}>
            {author.name} asks:
          </Typography>
          <Divider />
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <UserAvatar name={author.name} avatarURL={author.avatarURL} />
            </Grid>
            <Grid item xs={9}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
              >
                <Typography variant="overline">Would you rather</Typography>
                <Typography className={classes.question}>
                  ... {question.optionOne.text.split(" ")[0]}...
                </Typography>
                <Button
                  fullWidth={true}
                  color="primary"
                  onClick={e => this.toPoll(e, id)}
                >
                  View Pull
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(PollPreview))
);
