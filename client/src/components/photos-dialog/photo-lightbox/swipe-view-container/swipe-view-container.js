import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    flex: "1 1 auto",
    overflow: "hidden",
    display: "flex",
    minHeight: "100%",
    backgroundColor: "#000",
  },
});

export default function SwipeViewContainer({ children }) {
  const classes = useStyles();
  return <div className={classes.container}>{children}</div>;
}
