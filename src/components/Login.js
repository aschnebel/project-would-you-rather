import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

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
    marginBottom: '20px'
  }
});

const mapStateToProps = ({ users }) => {
  return {
    users
  };
};

class Login extends Component {
  state = {
    value: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    //Todo: Dispatch updateAuthedUser
  };

  handleChange = e => {
    console.log(e.target.value);
    this.setState(() => ({
      value: e.target.value
    }));
  };

  render() {
    const { classes, users } = this.props;
    const { value } = this.state;
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
                  <Select value={value} onChange={this.handleChange} className={classes.select}>
                    {users &&
                      Object.keys(users).map(userId => (
                        <MenuItem key={userId} value={userId}>
                          {users[userId].name}
                        </MenuItem>
                      ))}
                  </Select>
                  <Button type="submit" color="primary" variant="outlined" disabled={value === ''}>
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
