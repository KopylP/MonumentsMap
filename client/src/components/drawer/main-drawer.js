import React, { useContext } from "react";
import DrawerContainer from "../common/drawer-container/drawer-container";
import DrawerHeader from "./drawer-header/drawer-header";
import DrawerContent from "./drawer-content/drawer-content";
import AppContext from "../../context/app-context";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { makeStyles } from "@material-ui/core/styles";
import { isMobileOnly } from "react-device-detect";

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
}));

export default function MainDrawer(props) {
  const { mainDrawerOpen, setMainDrawerOpen } = useContext(AppContext);
  const classes = useStyles(props);

  const handleClose = () => {
    setMainDrawerOpen(false);
  }

  return (
    <SwipeableDrawer
      className={classes.drawerClass}
      variant={isMobileOnly ? "temporary" : "persistent"}
      onClose={handleClose}
      onOpen={p => p}
      anchor="left"
      classes={{
        paper: classes.drawerPaper,
      }}
      open={mainDrawerOpen}
    >
      <DrawerContainer>
        <DrawerHeader onBack={handleClose} />
        <DrawerContent />
      </DrawerContainer>
    </SwipeableDrawer>
  );
}
