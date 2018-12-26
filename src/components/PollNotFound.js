import React from "react";
import { withRouter } from "react-router-dom";

import { Button, Typography } from "@material-ui/core";

const PollNotFound = ({ history }) => (
  <div>
    <Typography variant="overline">
      The Poll you've been looking for does not exist.
    </Typography>
    <Button color="secondary" fullWidth onClick={() => history.push("/")}>
      Return to home
    </Button>
  </div>
);

export default withRouter(PollNotFound);
