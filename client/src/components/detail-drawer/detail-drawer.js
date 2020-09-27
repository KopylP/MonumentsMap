import React, { useContext, useState, useEffect } from "react";
import { makeStyles, SwipeableDrawer } from "@material-ui/core";
import DrawerContainer from "../common/drawer-container/drawer-container";
import DetailDrawerHeader from "./detail-drawer-header/detail-drawer-header";
import DetailDrawerContent from "./detail-drawer-content/detail-drawer-content";
import AppContext from "../../context/app-context";
import { usePrevious } from "../../hooks/hooks";
import ScrollBar from "../common/scroll-bar/scroll-bar";
import {
  useHistory,
  useParams,
} from "react-router-dom";
import PhotosDialog from "../photos-dialog/photos-dialog";
import DrawerBackButton from "../common/drawer-back-button/drawer-back-button";
import { isMobileOnly } from "react-device-detect";
import useCancelablePromise from "@rodw95/use-cancelable-promise";
import PhotoMobileList from "../photos-dialog/photo-mobile-list/photo-mobile-list";

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
  const makeCancelable = useCancelablePromise();

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
      setSelectedMonument({ ...monument });
      setCenter({
        lat: monument.latitude,
        lng: monument.longitude,
      });
    }
  };
  //---/end/----//

  const loadMonument = () => {
    makeCancelable(monumentService.getMonumentById(monumentId))
      .then(onMonumentLoad)
      .catch(); //TODO handle error
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
  const [selectedMonumentPhotoIndex, setSelectedMonumentPhotoIndex] = useState(
    0
  );

  const onMonumentPhotoClicked = (monumentPhoto) => {
    const findIndex = monument.monumentPhotos.findIndex(
      (p) => p.id === monumentPhoto.id
    );
    setSelectedMonumentPhotoIndex(findIndex);
    setPhotoDialogOpen(true);
  };

  const handleClose = () => {
    setDetailDrawerOpen(false);
    setTimeout(() => {
      history.replace("/");
    }, 200);
  };

  return (
    <React.Fragment>
      <SwipeableDrawer
        className={classes.drawerClass}
        variant={isMobileOnly ? "temporary" : "persistent"}
        onClose={handleClose}
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
        transitionDuration={200}
        open={detailDrawerOpen}
        onOpen={p => p}
      >
        <DrawerBackButton onClick={handleClose} />
        <ScrollBar>
          <DrawerContainer>
            <DetailDrawerHeader
              monument={monument}
              onMonumentPhotoClicked={onMonumentPhotoClicked}
            />
            <DetailDrawerContent monument={monument} />
          </DrawerContainer>
        </ScrollBar>
        {monument ? (
          <React.Fragment>
            {isMobileOnly ? (
              <PhotoMobileList
                monumentPhotoId={monument.id}
                open={photoDialogOpen}
                setOpen={setPhotoDialogOpen}
              />
            ) : (
              <PhotosDialog
                open={photoDialogOpen}
                setOpen={setPhotoDialogOpen}
                monumentPhotos={monument.monumentPhotos}
                initIndex={selectedMonumentPhotoIndex}
              />
            )}
          </React.Fragment>
        ) : null}
      </SwipeableDrawer>
    </React.Fragment>
  );
}
