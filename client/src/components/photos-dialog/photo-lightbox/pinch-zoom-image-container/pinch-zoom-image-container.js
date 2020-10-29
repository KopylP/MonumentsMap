import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    flex: "1 1 auto",
    overflow: "hidden",
    display: "flex",
  },
  firstWrapper: {
    position: "relative",
    flex: "1 1 auto",
  },
  secondWrapper: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
});

export default function PinchZoomImageContainer({ children }) {
  const classes = useStyles();
  return (
    <main className={classes.container}>
      <div className={classes.firstWrapper}>
        <div className={classes.secondWrapper}>{children}</div>
      </div>
    </main>
  );
}
