import React from "react";
import { connect } from "react-redux";

import { Redirect, Route, withRouter } from "react-router-dom";

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser
  };
};

const PrivateRoute = ({ component: Component, authedUser, ...rest }) => (
  <Route {...rest} render={ props =>
      authedUser !== null ? <Component {...props} /> : <Redirect to="/login" />
    } />
);

export default withRouter(connect(mapStateToProps)(PrivateRoute));
