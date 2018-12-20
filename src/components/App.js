import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { handleInitialData } from "../actions/shared";
import { isAuthenticated } from "../utils/auth";

import Login from "./Login";
import Dashboard from "./Dashboard";

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser } = this.props;

    return (
      <Router>
        <Fragment>
            {/* <Route path="/login" component={Login} />
            {!isAuthenticated(authedUser) ? (
              <Redirect to="/login" />
            ) : ( */}
              <Route exact path="/" component={Dashboard} />
            {/* )} */}
        </Fragment>
      </Router>
    );
  }
}

export default connect(mapStateToProps)(App);
