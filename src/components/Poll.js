import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography
} from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  questionType: {
    marginTop: 30
  },
  card: {
    minWidth: 400
  },
  avatar: {
    margin: 5,
    width: 80,
    height: 80
  },
  question: {
    marginLeft: 20
  }
});

const mapStateToProps = ({ questions, users, authedUser }, props) => {
  const { id } = props.match.params;
  const question = questions[id];
  const author = question ? users[question.author] : null;
  return {
    question,
    author,
    authedUser
  };
};

class Poll extends Component {
  state = {
    value: ""
  };

  handleChange = value => {
    this.setState(() => ({
      value: value
    }));
  };

  render() {
    const { classes, author, question } = this.props;
    const { value } = this.state;
    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid
            className={classes.questionType}
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={16}
          >
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="subheading" gutterBottom={true}>
                  {author && author.name} asks:
                </Typography>
                <Divider />
                <Grid container spacing={24}>
                  <Grid item xs={3}>
                    <Avatar
                      alt={author && author.name}
                      src={author && author.avatarURL}
                      className={classes.avatar}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Grid
                      container
                      direction="column"
                      justify="center"
                      alignItems="flex-start"
                    >
                      <Typography variant="overline">
                        Would you rather
                      </Typography>

                      <RadioGroup value={value} onChange={e => this.handleChange(e.target.value)}>
                        <FormControlLabel
                          value="optionOne"
                          control={<Radio color="primary" />}
                          labelPlacement="end"
                          label={question && question.optionOne.text}
                        />
                        <FormControlLabel
                          value="optionTwo"
                          control={<Radio color="primary" />}
                          labelPlacement="end"
                          label={question && question.optionTwo.text}
                        />
                      </RadioGroup>
                      <Button fullWidth={true} color="primary">
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Poll));
