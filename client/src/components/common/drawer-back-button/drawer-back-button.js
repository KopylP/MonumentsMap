import React, { useState } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  fabBack: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "rgba(100, 100, 100, 0.3)",
  },
}));

export default function DrawerBackButton({ onClick = (p) => p, ...props }) {
  const classes = useStyles(props);
  return (
    <Fab
      size="small"
      aria-label="close"
      onClick={onClick}
      className={classes.fabBack}
    >
      <ArrowBackIcon style={{ color: "white" }} />
    </Fab>
  );
}
