import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { isEmpty } from 'ramda';

import { handleInitialData } from "../actions/shared";
import { isAuthenticated } from "../utils/auth";

import Login from "./Login";
import Dashboard from "./Dashboard";
import Poll from "./Poll";

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
    const { authedUser, loading } = this.props;

    if (loading) {
      return <div>Loading...</div>
    }

    return (
      <Router>
        <Fragment>
            {/* <Route path="/login" component={Login} />
            {!isAuthenticated(authedUser) ? (
              <Redirect to="/login" />
            ) : ( */}
              <Route exact path="/" component={Dashboard} />
              <Route path="/questions/:id" component={Poll} />
            {/* )} */}
        </Fragment>
      </Router>
    );
  }
}

export default connect(mapStateToProps)(App);
