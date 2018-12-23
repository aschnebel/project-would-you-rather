import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import Question from "./Question";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  questionType: {
    marginTop: 30
  }
});

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  return {
    id
  };
};

class Poll extends Component {
  render() {
    const { classes, id } = this.props;
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
            <Question qid={id} />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Poll));
