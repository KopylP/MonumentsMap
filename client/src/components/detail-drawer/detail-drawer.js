import React, { memo, useContext } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { makeStyles } from "@material-ui/core/styles";
import AppContext from "../../context/app-context";
import DrawerBackButton from "../common/drawer-back-button/drawer-back-button";
import { isMobileOnly } from "react-device-detect";
import { detailDrawerTransitionDuration } from "./config";
import DetailDrawerRoot from "./detail-drawer-root/detail-drawer-root";

const useStyles = makeStyles((theme) => ({
  drawerClass: {
    width: theme.detailDrawerWidth,
    flexShrink: 0,
    [theme.breakpoints.down(theme.detailDrawerWidth)]: {
      width: "100%",
    },
  },
  drawerPaper: {
    width: theme.detailDrawerWidth,
    [theme.breakpoints.down(theme.detailDrawerWidth)]: {
      width: "100%",
    },
  },
}));

export default memo(function DetailDrawer() {

  const classes = useStyles();

  const {
    detailDrawerOpen,
    setDetailDrawerOpen,
  } = useContext(AppContext);

  
  const handleClose = () => {
    setDetailDrawerOpen(false);
  };

  return (
      <SwipeableDrawer
        className={classes.drawerClass}
        variant={isMobileOnly ? "temporary" : "persistent"}
        onClose={handleClose}
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
        transitionDuration={detailDrawerTransitionDuration}
        open={detailDrawerOpen}
        onOpen={(p) => p}
      >
        <DrawerBackButton onClick={handleClose} />
        <DetailDrawerRoot />
      </SwipeableDrawer>
  );
});
