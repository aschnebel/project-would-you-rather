import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { handleInitialData } from "../actions/shared";

function mapStateToProps(state) {
  return {
  
  };
}

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <div>Hello World!</div>
        </Fragment>
      </Router>
    );
  }
}

export default connect(mapStateToProps)(App);
