import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { isEmpty } from "ramda";

import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import { handleInitialData } from "../actions/shared";

import PrivateRoute from "./PrivateRoute";
import Nav from "./Nav";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Poll from "./Poll";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";
import PageNotFound from "./PageNotFound";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  questionType: {
    marginTop: 30
  }
});

function mapStateToProps({ questions, users }) {
  return {
    loading: isEmpty(questions) && isEmpty(users)
  };
}

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { classes, loading } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <Router>
        <div>
          <Nav />
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
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <Route path="/login" component={Login} />
                  <PrivateRoute path="/new" component={NewQuestion} />
                  <PrivateRoute path="/leaderboard" component={Leaderboard} />
                  <PrivateRoute path="/questions/:id" component={Poll} />
                  <Route component={PageNotFound} />
                </Switch>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(App));
