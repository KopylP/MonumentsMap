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
import {
  BrowserRouter as Router,
  useHistory,
  useParams,
} from "react-router-dom";
import PhotosDialog from "../photos-dialog/photos-dialog";
import PhotoLightbox from "../photos-dialog/photo-lightbox/photo-lightbox";

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
  const {
    monumentService,
    detailDrawerOpen,
    setDetailDrawerOpen,
    selectedMonument,
    setSelectedMonument,
    setCenter,
  } = useContext(AppContext);
  const [monument, setMonument] = useState(null);
  const { monumentId } = useParams();
  const history = useHistory();

  const onMonumentLoad = (monument) => {
    ((monument) => {
      centerMap(monument);
      setTimeout(() => {
        setMonument(monument);
      }, 200);
    })(monument);
  };

  //change selectedMonument to open popup on the map
  const centerMap = (monument) => {
    if (monument != null && selectedMonument.id !== monument.id) {
      setSelectedMonument({ id: monument.id });
      setCenter({
        lat: monument.latitude,
        lng: monument.longitude,
      });
    }
  };
  //---/end/----//

  const loadMonument = () => {
    monumentService.getMonumentById(monumentId).then(onMonumentLoad).catch(); //TODO handle error
  };

  const onPhotoSave = (monumentPhoto) => {
    console.log(monumentPhoto);
  };

  const prevMonumentId = usePrevious(monumentId);

  useEffect(() => {
    if (
      monumentId !== 0 &&
      (prevMonumentId !== monumentId || detailDrawerOpen === false)
    ) {
      setMonument(null);
      setDetailDrawerOpen(true);
      loadMonument();
    }
  }, [monumentId]);

  const [photoDialogOpen, setPhotoDialogOpen] = useState(false);
  const [selectedMonumentPhotoId, setSelectedMonumentPhotoId] = useState(null);

  const onMonumentPhotoClicked = (monumentPhoto) => {
    setSelectedMonumentPhotoId(monumentPhoto.id);
    setPhotoDialogOpen(true);
  };

  return (
    <React.Fragment>
      <Drawer
        className={classes.drawerClass}
        variant="persistent"
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
        transitionDuration={200}
        open={detailDrawerOpen}
      >
        <DetailDrawerContext.Provider value={{ onPhotoSave }}>
          <ScrollBar>
            <DrawerContainer>
              <DetailDrawerHeader
                monument={monument}
                onBack={() => {
                  setDetailDrawerOpen(false);
                  setTimeout(() => {
                    history.replace("/");
                  }, 200);
                }}
                onMonumentPhotoClicked={onMonumentPhotoClicked}
              />
              <DetailDrawerContent monument={monument} />
            </DrawerContainer>
          </ScrollBar>
        </DetailDrawerContext.Provider>
        {monument ? (
          <React.Fragment>
            {/* <PhotosDialog
              open={photoDialogOpen}
              firstMonumentPhotoId={selectedMonumentPhotoId}
              setOpen={setPhotoDialogOpen}
              monumentPhotos={monument.monumentPhotos}
            /> */}
            <PhotoLightbox open={photoDialogOpen} setOpen={setPhotoDialogOpen} monumentPhotos={monument.monumentPhotos}/>
          </React.Fragment>
        ) : null}
      </Drawer>
    </React.Fragment>
  );
}
