import React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { makeStyles } from "@material-ui/core/styles";
import DrawerBackButton from "../common/drawer-back-button/drawer-back-button";
import { isMobileOnly } from "react-device-detect";
import { detailDrawerTransitionDuration } from "./config";
import DetailDrawerRoot from "./detail-drawer-root/detail-drawer-root";
import { connect } from "react-redux";
import { closeDetailDrawer } from "../../actions/detail-monument-actions";

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
  floatingMenu: {
    outline: 0,
    boxShadow: "none"
  }
}));

function DetailDrawer({ detailDrawerOpen, closeDetailDrawer }) {

  const classes = useStyles();

  
  const handleClose = () => {
    closeDetailDrawer();
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
        PaperProps={{
          className: classes.floatingMenu
        }}
        transitionDuration={detailDrawerTransitionDuration}
        open={detailDrawerOpen}
        onOpen={(p) => p}
      >
        <DrawerBackButton onClick={handleClose} />
        <DetailDrawerRoot />
      </SwipeableDrawer>
  );
};

const bindStateToProps = ({ detailMonument: { detailDrawerOpen } }) => ({detailDrawerOpen});
const bindDispatchToProps = { closeDetailDrawer };

export default connect(bindStateToProps, bindDispatchToProps)(DetailDrawer);
