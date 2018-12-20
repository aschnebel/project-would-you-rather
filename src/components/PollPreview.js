import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography
} from "@material-ui/core";

const styles = theme => ({
  card: {
    minWidth: 400
  },
  avatar: {
    margin: 5,
    width: 80,
    height: 80
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
  render() {
    const { classes, author, question } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="subheading" gutterBottom={true}>
            {author.name} asks:
          </Typography>
          <Divider />
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <Avatar
                alt={author.name}
                src={author.avatarURL}
                className={classes.avatar}
              />
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
                <Button fullWidth={true} color="primary">
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

export default connect(mapStateToProps)(withStyles(styles)(PollPreview));
