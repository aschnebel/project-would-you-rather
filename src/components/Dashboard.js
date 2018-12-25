import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';
import { Button, Grid } from "@material-ui/core";

import { getAnsweredIds, getUnansweredIds } from '../utils/helper';

import PollPreview from "./PollPreview";

const styles = () => ({
  button: {
    marginRight: 8
  }
});

const mapStateToProps = ({ questions, authedUser }) => {
  return {
    unansweredQuestionIds: getUnansweredIds(questions, authedUser),
    answeredQuestionIds: getAnsweredIds(questions, authedUser)
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
      <Fragment>
        <Button
          variant={showAnswered ? "outlined" : "contained"}
          color="primary"
          className={classes.button}
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

export default connect(mapStateToProps)(withStyles(styles)(Dashboard));
