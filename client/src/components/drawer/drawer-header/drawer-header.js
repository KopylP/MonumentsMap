import React, { useState } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Fab from "@material-ui/core/Fab";
import DrawerImage from "./drawer-image.jpg";
import { makeStyles } from "@material-ui/core";
import DrawerBackButton from "../../common/drawer-back-button/drawer-back-button";

const useStyles = makeStyles((theme) => ({
  backButtonContainer: {
    width: "100%",
    height: 250,
    backgroundImage: `url(${DrawerImage})`,
    backgroundSize: "cover",
    position: "relative",
    backgroundPosition: "center"
  },
  fabBack: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "rgba(100, 100, 100, 0.3)",
  },
}));

function DrawerHeader(props) {
  const classes = useStyles(props);
  const { onBack } = props;
  return (
      <div className={classes.backButtonContainer}>
        <DrawerBackButton onClick={onBack}/>
      </div>
  );
}

export default DrawerHeader;
