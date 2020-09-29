import React from "react";
import DrawerImage from "./drawer-image.jpg";
import { makeStyles } from "@material-ui/core";
import DrawerBackButton from "../../common/drawer-back-button/drawer-back-button";
import { isMobile } from "react-device-detect";

const useStyles = makeStyles((theme) => ({
  backButtonContainer: {
    width: "100%",
    height: 100,
    backgroundImage: `url(${DrawerImage})`,
    backgroundSize: "cover",
    position: "relative",
    backgroundPosition: "center",
    flexShrink: 0
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
        { isMobile && <DrawerBackButton onClick={onBack}/> }
      </div>
  );
}

export default DrawerHeader;
