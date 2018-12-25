import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { Avatar, Grid } from "@material-ui/core";

const styles = () => ({
  avatar: {
    margin: 5,
    width: 80,
    height: 80
  }
});

const UserAvatar = ({ avatarURL, classes, name }) => (
  <Grid container direction="column" justify="center" alignItems="center">
    <Avatar alt={name} src={avatarURL} className={classes.avatar} />
  </Grid>
);

UserAvatar.propTypes = {
  avatarURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default withStyles(styles)(UserAvatar);
