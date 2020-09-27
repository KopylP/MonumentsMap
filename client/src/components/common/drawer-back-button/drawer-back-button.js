import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  fabBackRightAttach: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "rgba(100, 100, 100, 0.3)",
    zIndex: 1300
  },
  fabBackLeftAttach: {
    position: "absolute",
    left: 10,
    top: 10,
    backgroundColor: "rgba(100, 100, 100, 0.3)",
    zIndex: 1300
  },
  fabFixedButtonLeft: {
    position: "fixed",
    left: 10,
    top: 10,
    backgroundColor: "rgba(100, 100, 100, 0.3)",
    zIndex: 1300
  },
}));

export default function DrawerBackButton({ onClick = (p) => p, attachTo = "right", fixed = false}) {
  const classes = useStyles();
  let className;
  if(attachTo === "right") {
    if(fixed) {
      //TODO
    } else {
      className = classes.fabBackRightAttach;
    }
  } else {
    if(fixed) {
      className = classes.fabFixedButtonLeft;
    } else {
      className = classes.fabBackLeftAttach;
    }
  }
  return (
    <Fab
      size="small"
      aria-label="close"
      onClick={onClick}
      className={className}
    >
      <ArrowBackIcon style={{ color: "white" }} />
    </Fab>
  );
}
