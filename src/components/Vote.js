import React from "react";
import PropTypes from "prop-types";

import { LinearProgress, Typography } from "@material-ui/core";

const style = {
  vote: {
    marginTop: 20,
    padding: 20,
    border: "solid lightgrey 1px",
    borderRadius: "5px"
  },
  text: {
    marginBottom: 20
  }
};

const Vote = ({ text, votes, totalVotes, active }) => {
  return (
    <div style={style.vote}>
      {active ? <Typography variant="overline">Your Vote</Typography> : null}
      <Typography variant="subheading" gutterBottom={true} style={style.text}>
        Would you rather {text}
      </Typography>
      <LinearProgress
        value={votes / totalVotes * 100}
        variant="determinate"
        color={active ? "primary" : "secondary"}
      />
      <Typography>
        {votes} out of {totalVotes} votes
      </Typography>
    </div>
  );
};

Vote.propTypes = {
  text: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  totalVotes: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired
};

export default Vote;
