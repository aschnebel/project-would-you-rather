import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleInitialData } from '../actions/shared';

function mapStateToProps({users}) {
  return {
    users
  };
}

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <div>
        Hello World!
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(App);