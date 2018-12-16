import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps({users, authedUser}) {
  return {
      users,
      authedUser
  };
}

class Login extends Component {
  render() {
    return (
      <div>
        Login
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(Login);