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
    zIndex: 1501
  },
  fabBackLeftAttach: {
    position: "absolute",
    left: 10,
    top: 10,
    backgroundColor: "rgba(100, 100, 100, 0.3)",
    zIndex: 1501
  },
  fabFixedButtonLeft: {
    position: "fixed",
    left: 10,
    top: 10,
    backgroundColor: "rgba(100, 100, 100, 0.3)",
    zIndex: 1501
  },
}));

export default function DrawerBackButton({ onClick = (p) => p, attachTo = "right", fixed = false, style = {}}) {
  const classes = useStyles();
  let className;
  if(attachTo === "right") {
    if(!fixed) {
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
      style={style}
      onClick={onClick}
      className={className}
    >
      <ArrowBackIcon style={{ color: "white" }} />
    </Fab>
  );
}
