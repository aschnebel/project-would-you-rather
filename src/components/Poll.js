import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from "@material-ui/core";

import Question from "./Question";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
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
  },
  question: {
    marginLeft: 20
  }
});

const mapStateToProps = ({ questions, users, authedUser }, props) => {
  const { id } = props.match.params;
  const author = questions[id] ? users[questions[id].author] : null;
  return {
    id,
    author,
    authedUser
  };
};

class Poll extends Component {
  render() {
    const { classes, author, id } = this.props;
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
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="subheading" gutterBottom={true}>
                  {author && author.name} asks:
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
                      alignItems="flex-start"
                    >
                      <Question qid={id} />
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Poll));
