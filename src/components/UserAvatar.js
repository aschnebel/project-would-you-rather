import React from "react";

import { withStyles } from "@material-ui/core/styles";
import { Avatar, Grid } from "@material-ui/core";

const styles = theme => ({
  avatar: {
    margin: 5,
    width: 80,
    height: 80
  }
});

const UserAvatar = ({ avatarURL, classes, name }) => {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Avatar alt={name} src={avatarURL} className={classes.avatar} />
    </Grid>
  );
};

export default withStyles(styles)(UserAvatar);
