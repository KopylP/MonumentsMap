import React from "react";
import DrawerContainer from "../common/drawer-container/drawer-container";
import DrawerHeader from "./drawer-header/drawer-header";
import DrawerContent from "./drawer-content/drawer-content";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { makeStyles } from "@material-ui/core/styles";
import { isMobileOnly } from "react-device-detect";
import { connect } from "react-redux";
import { closeDrawer } from "../../actions/filter-actions";

const useStyles = makeStyles((theme) => ({
  drawerClass: {
    width: theme.drawerWidth,
    [theme.breakpoints.down(theme.drawerWidth)]: {
      width: "100%",
    },
    flexShrink: 0,
  },
  drawerPaper: {
    width: theme.drawerWidth,
    [theme.breakpoints.down(theme.drawerWidth)]: {
      width: "100%",
    },
  },
  floatingMenu: {
    outline: 0,
    boxShadow: "none"
  }
}));

function MainDrawer({ drawerOpen, closeDrawer }) {
  const classes = useStyles();

  const handleClose = () => {
    closeDrawer();
  };

  return (
    <SwipeableDrawer
      className={classes.drawerClass}
      variant={isMobileOnly ? "temporary" : "persistent"}
      onClose={handleClose}
      onOpen={(p) => p}
      anchor="left"
      classes={{
        paper: classes.drawerPaper,
      }}
      PaperProps={{
        className: classes.floatingMenu
      }}
      open={isMobileOnly ? drawerOpen : true}
    >
      <DrawerContainer>
        <DrawerHeader onBack={handleClose} />
        <DrawerContent />
      </DrawerContainer>
    </SwipeableDrawer>
  );
}

const mapStateToProps = ({ filter: { drawerOpen } }) => ({ drawerOpen });
const mapDispatchToProps = { closeDrawer };

export default connect(mapStateToProps, mapDispatchToProps)(MainDrawer);
