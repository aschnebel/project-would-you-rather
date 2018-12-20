import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

import PollPreview from "./PollPreview";

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

const mapStateToProps = ({ questions }) => {
  return {
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    )
  };
};

class Dashboard extends Component {
  render() {
    const { classes, questionIds } = this.props;
    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={16}
          >
            {questionIds.map(id => (
              <div key={id}>
                <PollPreview id={id} />
              </div>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Dashboard));
