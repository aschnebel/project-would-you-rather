import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography
} from "@material-ui/core";

import { handleAddQuestion } from "../actions/questions";

const styles = theme => ({
  card: {
    minWidth: 400
  },
  button: {
    marginTop: 10
  }
});

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser
  };
};

class NewQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: ""
  };

  handleSubmit = e => {
    const { authedUser, dispatch, history } = this.props;
    const { optionOneText, optionTwoText } = this.state;

    e.preventDefault();
    dispatch(
      handleAddQuestion({
        author: authedUser,
        optionOneText,
        optionTwoText
      })
    );
    history.push("/");
  };

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { optionOneText, optionTwoText } = this.state;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="subheading" gutterBottom={true} align="center">
            Create New Question
          </Typography>
          <Divider />
          <Typography variant="overline" gutterBottom={true}>
            Complete the question
          </Typography>
          <Typography variant="subheading" gutterBottom={true}>
            Would you rather...
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <TextField
              fullWidth={true}
              placeholder="this"
              value={optionOneText}
              onChange={this.handleChange("optionOneText")}
              variant="outlined"
              margin="dense"
            />
            <Typography variant="subheading" align="center">
              or
            </Typography>
            <TextField
              fullWidth={true}
              placeholder="that"
              value={optionTwoText}
              onChange={this.handleChange("optionTwoText")}
              margin="dense"
              variant="outlined"
            />
            <Button
              type="submit"
              className={classes.button}
              variant="outlined"
              color="primary"
              fullWidth={true}
              disabled={optionOneText === "" || optionTwoText === ""}
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }
}

export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(NewQuestion))
);
