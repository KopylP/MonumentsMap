import React, { useContext, useState, useEffect } from "react";
import { makeStyles, Drawer } from "@material-ui/core";
import DrawerContainer from "../common/drawer-container/drawer-container";
import DetailDrawerHeader from "./detail-drawer-header/detail-drawer-header";
import DetailDrawerContent from "./detail-drawer-content/detail-drawer-content";
import AppContext from "../../context/app-context";
import { usePrevious } from "../../hooks/hooks";
import PerfectScrollbar from "react-perfect-scrollbar";
import ScrollBar from "../common/scroll-bar/scroll-bar";

const useStyles = makeStyles((theme) => ({
  drawerClass: {
    width: theme.drawerWidth + 20,
    flexShrink: 0,
  },
  drawerPaper: {
    width: theme.drawerWidth + 20,
  },
}));

export default function DetailDrawer(props) {
  const classes = useStyles(props);
  const { selectedMonumentId, monumentService } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [monument, setMonument] = useState(null);

  const loadMonument = () => {
    monumentService
      .getMonumentById(selectedMonumentId)
      .then((monument) => {
        setMonument(monument);
        console.log(monument);
      })
      .catch(); //TODO handle error
  };

  const prevSelectedMonumentId = usePrevious(selectedMonumentId);

  useEffect(() => {
    if (
      selectedMonumentId !== 0 &&
      selectedMonumentId !== prevSelectedMonumentId
    ) {
      setMonument(null);
      setOpen(true);
      loadMonument();
    } else if (selectedMonumentId === 0) {
      setMonument(null);
      // setOpen(false);
    }
  }, [selectedMonumentId]);

  return (
    <Drawer
      className={classes.drawerClass}
      variant="persistent"
      anchor="left"
      classes={{
        paper: classes.drawerPaper,
      }}
      open={open}
    >
      <ScrollBar>
        <DrawerContainer>
          <DetailDrawerHeader onBack={() => setOpen(false)} />
          <DetailDrawerContent monument={monument} />
        </DrawerContainer>
      </ScrollBar>
    </Drawer>
  );
}
