import React, { useState, useContext, useRef } from "react";
import clsx from "clsx";
import { makeStyles, Drawer, CircularProgress } from "@material-ui/core";
import PhotoDrawerContent from "../photo-drawer-content/photo-drawer-content";
import PhotoViewer from "../photo-viewer/photo-viewer";
import AppContext from "../../../context/app-context";
import PhotosContainerButtons from "./photos-container-buttons";
import useMutationObserver from "@rooks/use-mutation-observer";
import PhotosActionButtons from "./photo-action-buttons/photos-action-buttons";
import MenuButton from "./menu-button";
import savePhoto from "../../helpers/save-photo";
import PhotoListSlider from "../photo-list-slider/photo-list-slider";
import AbsoluteCircularLoader from "../../common/loaders/absolute-circular-loader";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
  photoListBox: {
    width: theme.detailDrawerWidth,
    marginRight: 5,
  },
  photoBox: {
    width: "100%",
    height: "100%",
  },
  drawer: {
    width: theme.detailDrawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: theme.detailDrawerWidth,
  },
  photoContainer: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -theme.detailDrawerWidth,
    backgroundColor: "black",
    height: "100vh",
    overflow: "hidden",
    width: "100%",
    position: "relative",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PhotosContainer({
  monumentPhotos,
  onBack = (p) => p,
  initIndex,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const { monumentService } = useContext(AppContext);
  const [originalSize, setOriginalSize] = useState(true);
  const [selectedMonumentPhotoIndex, setSelectedMonumentPhotoIndex] = useState(
    initIndex
  );
  const [imageContainerWidth, setImageContainerWidth] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  // const prevImageContainerWidth = usePrevious(imageContainerWidth);
  const handleSizeChange = (isOriginalSize) => {
    setOriginalSize(isOriginalSize);
  };

  const setImageIndex = (index) => {
    setSelectedMonumentPhotoIndex(index);
    setImageLoading(true);
  };

  const handleMonumentPhotoClick = (monumentPhotoIndex) => {
    setImageIndex(monumentPhotoIndex);
  };

  const handleLeftButtonClick = () => {
    setImageIndex(selectedMonumentPhotoIndex - 1);
  };

  const handleRightButtonClick = () => {
    setImageIndex(selectedMonumentPhotoIndex + 1);
  };

  const handleImageLoading = () => {
    setImageLoading(false);
  };

  const handleActionButtonsClick = (action) => {
    switch (action) {
      case "close":
        onBack();
        break;
      case "save":
        savePhoto(
          monumentService.getPhotoLink(
            monumentPhotos[selectedMonumentPhotoIndex].photoId
          )
        );
        break;
      default:
        break;
    }
  };

  /*(1) This is feature:) I add this few lines of code, to force update layout position of image viewer component */
  const containerRef = useRef();
  const onSizeChange = (e) => {
    const width = containerRef.current.offsetWidth;
    if (width !== imageContainerWidth) {
      setImageContainerWidth(width);
    }
  };
  useMutationObserver(containerRef, onSizeChange);
  /* end (1) */

  // const container =
  //   window !== undefined ? () => window.document.body : undefined;
  return (
    <div className={classes.container}>
      <Drawer
        className={classes.drawer}
        // container={container}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <PhotoDrawerContent
          monumentPhoto={monumentPhotos[selectedMonumentPhotoIndex]}
          onBack={onBack}
        />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
        ref={containerRef}
      >
        {imageLoading && <AbsoluteCircularLoader size="4em" />}
        <MenuButton onClick={(e) => setOpen(!open)} />
        <PhotosActionButtons onClick={handleActionButtonsClick} />
        <PhotoViewer
          imgUrl={monumentService.getPhotoLink(
            monumentPhotos[selectedMonumentPhotoIndex].photoId
          )}
          onSizeChanged={handleSizeChange}
          onImageLoad={handleImageLoading}
        />
        <PhotoListSlider
          show={originalSize || imageLoading}
          monumentPhotos={monumentPhotos}
          selectedMonumentPhotoIndex={selectedMonumentPhotoIndex}
          onMonumentPhotoClick={handleMonumentPhotoClick}
        />
        <PhotosContainerButtons
          hideLeftButton={selectedMonumentPhotoIndex === 0 || !originalSize}
          hideRightButton={
            selectedMonumentPhotoIndex === monumentPhotos.length - 1 ||
            !originalSize
          }
          onLeftClick={handleLeftButtonClick}
          onRightClick={handleRightButtonClick}
        />
      </main>
    </div>
  );
}
