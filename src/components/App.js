import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { isEmpty } from "ramda";

import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import { handleInitialData } from "../actions/shared";
import { isAuthenticated } from "../utils/auth";

import Login from "./Login";
import Dashboard from "./Dashboard";
import Poll from "./Poll";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  questionType: {
    marginTop: 30
  }
});

function mapStateToProps({ authedUser, questions, users }) {
  return {
    authedUser,
    loading: isEmpty(questions) && isEmpty(users)
  };
}

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser, classes, loading } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <Router>
        <Fragment>
          {/* <Route path="/login" component={Login} />
            {!isAuthenticated(authedUser) ? (
              <Redirect to="/login" />
            ) : ( */}
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
                <Route exact path="/" component={Dashboard} />
                <Route path="/questions/:id" component={Poll} />
              </Grid>
            </Grid>
          </Grid>
          {/* )} */}
        </Fragment>
      </Router>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(App));
