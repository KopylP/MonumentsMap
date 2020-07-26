import React, { useContext, useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import DrawerContainer from "../common/drawer-container/drawer-container";
import DrawerHeader from "./drawer-header/drawer-header";
import DrawerContent from "./drawer-content/drawer-content";
import AppContext from "../../context/app-context";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { makeStyles } from "@material-ui/core";
import AddModal from "../add-modal/add-modal";

// width: 350px;
// flex-shrink: 0;

const useStyles = makeStyles(theme => ({
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
  }
}));

export default function MainDrawer(props) {
  const { mainDrawerOpen, setMainDrawerOpen } = useContext(AppContext);
  const [openAddModel, setOpenAddModel] = useState(false);
  const classes = useStyles(props);

  const addMonument = () => {
    setOpenAddModel(true);
  }

  return (
    <Drawer
      className={classes.drawerClass}
      variant="persistent"
      anchor="left"
      classes={{
        paper: classes.drawerPaper,
      }}
      open={mainDrawerOpen}
    >
      <DrawerContainer>
        <DrawerHeader onBack={() => setMainDrawerOpen(false)}/>
        <DrawerContent onAdd={addMonument}/>
      </DrawerContainer>
      <AddModal openAddModal={openAddModel} setOpenAddModal={setOpenAddModel}/>
    </Drawer>
  );
}
