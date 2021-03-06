import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import { AppBar, Button, Toolbar, Typography, Avatar } from "@material-ui/core";

import { logout } from "../actions/authedUser";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  link: {
    textDecoration: "none",
    color: "black",
    marginLeft: -12,
    marginRight: 20
  },
  user: {
    fontSize: "0.875rem",
    marginRight: 10
  },
  avatar: {
    marginRight: 30
  }
};

const mapStateToProps = ({ authedUser, users }) => {
  return {
    user: authedUser ? users[authedUser] : null
  };
};

class Nav extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logout());
  };

  render() {
    const { classes, user } = this.props;
    const { pathname } = this.props.location;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Link to="/" className={classes.link}>
              <Button
                variant={pathname === "/" ? "contained" : null}
                color={pathname === "/" ? "primary" : "inherit"}
              >
                Home
              </Button>
            </Link>
            <Link to="/add" className={classes.link}>
              <Button
                variant={pathname === "/add" ? "contained" : null}
                color={pathname === "/add" ? "primary" : "inherit"}
              >
                New Question
              </Button>
            </Link>
            <Link to="/leaderboard" className={classes.link}>
              <Button
                variant={pathname === "/leaderboard" ? "contained" : null}
                color={pathname === "/leaderboard" ? "primary" : "inherit"}
              >
                Leaderboard
              </Button>
            </Link>
            <div className={classes.grow} />
            {user && (
              <Fragment>
                <Typography className={classes.user} color="inherit">
                  Hello, {user.name}
                </Typography>
                <Avatar className={classes.avatar} src={user.avatarURL} />
                <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
              </Fragment>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Nav)));
