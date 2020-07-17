import React, { useState } from "react";
import DrawerImage from "../../drawer/drawer-header/drawer-image.jpg";
import { makeStyles } from "@material-ui/core";
import DrawerBackButton from "../../common/drawer-back-button/drawer-back-button";

const useStyles = makeStyles((theme) => ({
  imagesContainer: {
    width: "100%",
    height: 250,
    backgroundImage: `url(${DrawerImage})`,
    backgroundSize: "cover",
    position: "relative",
    backgroundPosition: "center",
    flexShrink: 0
  },
}));

export default function DetailDrawerHeader(props) {
  const classes = useStyles(props);
  const { onBack = (p) => p } = props;
  return (
    <div className={classes.imagesContainer}>
      <DrawerBackButton onClick={onBack} />
    </div>
  );
}
