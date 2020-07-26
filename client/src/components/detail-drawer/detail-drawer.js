import React, { useContext, useState, useEffect } from "react";
import { makeStyles, Drawer } from "@material-ui/core";
import DrawerContainer from "../common/drawer-container/drawer-container";
import DetailDrawerHeader from "./detail-drawer-header/detail-drawer-header";
import DetailDrawerContent from "./detail-drawer-content/detail-drawer-content";
import AppContext from "../../context/app-context";
import { usePrevious } from "../../hooks/hooks";
import PerfectScrollbar from "react-perfect-scrollbar";
import ScrollBar from "../common/scroll-bar/scroll-bar";
import DetailDrawerContext from "./context/detail-drawer-context";

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

export default function DetailDrawer(props) {
  const classes = useStyles(props);
  const { selectedMonument, monumentService, detailDrawerOpen, setDetailDrawerOpen } = useContext(AppContext);
  const [monument, setMonument] = useState(null);

  const loadMonument = () => {
    monumentService
      .getMonumentById(selectedMonument.id)
      .then((monument) => {
        ((monument) => {
          setTimeout(() => {
            setMonument(monument);
          }, 200);
        })(monument);
      })
      .catch(); //TODO handle error
  };

  const onPhotoSave = (monumentPhoto) => {
    console.log(monumentPhoto);
  };

  const prevSelectedMonument = usePrevious(selectedMonument);

  useEffect(() => {
    if (
      selectedMonument.id !== 0 &&
      (prevSelectedMonument.id !== selectedMonument.id || detailDrawerOpen === false)
    ) {
      setMonument(null);
      setDetailDrawerOpen(true);
      loadMonument();
    } else if (selectedMonument.id === 0) {
      setMonument(null);
    }
  }, [selectedMonument]);

  return (
    <Drawer
      className={classes.drawerClass}
      variant="persistent"
      anchor="left"
      classes={{
        paper: classes.drawerPaper,
      }}
      open={detailDrawerOpen}
    >
      <DetailDrawerContext.Provider value={{ onPhotoSave }}>
        <ScrollBar>
          <DrawerContainer>
            <DetailDrawerHeader
              monument={monument}
              onBack={() => {
                setDetailDrawerOpen(false);
              }}
            />
            <DetailDrawerContent monument={monument} />
          </DrawerContainer>
        </ScrollBar>
      </DetailDrawerContext.Provider>
    </Drawer>
  );
}
