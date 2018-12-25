import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  Typography
} from "@material-ui/core";

import { authenticate } from "../actions/authedUser";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: "200px auto",
    maxWidth: 400
  },
  select: {
    marginBottom: "20px"
  }
});

const mapStateToProps = ({ users, authedUser }) => {
  return {
    users,
    id: authedUser
  };
};

class Login extends Component {
  state = {
    value: "",
    authenticated: false
  };

  handleSubmit = e => {
    e.preventDefault();

    const { value } = this.state;
    const { dispatch, id } = this.props;

    dispatch(authenticate(value));

    this.setState(() => ({
      value: "",
      authenticated: id ? false : true
    }));
  };

  handleChange = e => {
    this.setState(() => ({
      value: e.target.value
    }));
  };

  render() {
    const { classes, users } = this.props;
    const { value, authenticated } = this.state;

    if (authenticated) {
      return <Redirect to="/" />;
    }

    return (
      <div className={classes.root}>
        <form onSubmit={this.handleSubmit}>
          <Paper className={classes.paper}>
            <Grid container spacing={16}>
              <Grid item xs={12} sm container>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="stretch"
                >
                  <Typography align="center" variant="h6">
                    Welcome to the Would You Rather App!
                  </Typography>
                  <Typography
                    align="center"
                    variant="subheading"
                    gutterBottom={true}
                  >
                    Please sign in to continue
                  </Typography>
                  <Select
                    value={value}
                    onChange={this.handleChange}
                    className={classes.select}
                  >
                    {users &&
                      Object.keys(users).map(userId => (
                        <MenuItem key={userId} value={userId}>
                          {users[userId].name}
                        </MenuItem>
                      ))}
                  </Select>
                  <Button
                    type="submit"
                    color="primary"
                    variant="outlined"
                    disabled={value === ""}
                  >
                    Sign in
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Login));
