import React from "react";
import PropTypes from "prop-types";

import { LinearProgress, Tooltip, Typography } from "@material-ui/core";

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

const Vote = ({ text, votes, totalVotes, active }) => (
  <div style={style.vote}>
    {active ? <Typography variant="overline">Your Vote</Typography> : null}
    <Typography variant="subheading" gutterBottom={true} style={style.text}>
      Would you rather {text}
    </Typography>
    <Tooltip title={`${Math.round((votes / totalVotes) * 100)}%`} placement="left">
      <LinearProgress
        value={(votes / totalVotes) * 100}
        variant="determinate"
        color={active ? "primary" : "secondary"}
      />
    </Tooltip>
    <Typography>
      {votes} out of {totalVotes} votes
    </Typography>
  </div>
);

Vote.propTypes = {
  text: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  totalVotes: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired
};

export default Vote;
