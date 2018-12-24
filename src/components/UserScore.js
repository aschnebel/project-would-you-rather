import React from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  Divider
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
  score: {
    margin: 5,
    width: 60,
    height: 60
  }
});

const mapStateToProps = ({ users }, { id }) => {
  return {
    user: users[id]
  };
};

const UserScore = ({
  classes,
  user,
  createdQuestions,
  answeredQuestions,
  score
}) => {
  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container spacing={24}>
          <Grid item xs={3}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Avatar
                alt={user.name}
                src={user.avatarURL}
                className={classes.avatar}
              />
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subheading" gutterBottom={true}>
              {user.name}
            </Typography>
            <Typography variant="subheading">
              Answered Questions: {answeredQuestions}
            </Typography>
            <Divider />
            <Typography variant="subheading">
              Created Questions: {createdQuestions}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subheading" gutterBottom={true} align="center">
              Score
            </Typography>
            <Divider variant="middle"/>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Avatar className={classes.score}>{score}</Avatar>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default connect(mapStateToProps)(withStyles(styles)(UserScore));
