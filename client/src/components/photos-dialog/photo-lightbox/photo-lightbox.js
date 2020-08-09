import React, { useContext, useRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import AppContext from "../../../context/app-context";
import Lightbox from "react-spring-lightbox";
import DrawerBackButton from "../../common/drawer-back-button/drawer-back-button";
import SwipeableBottomSheet from "react-swipeable-bottom-sheet";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  img: {
    width: "auto",
    height: "auto",
    maxWidth: "50%",
    verticalAlign: "middle",
  },
  slick: {
    height: "100%",
  },
}));

export default function PhotoLightbox({ monumentPhotos, open, setOpen }) {
  const classes = useStyles();
  const { monumentService } = useContext(AppContext);
  const images = monumentPhotos.map((monumentPhoto) => ({
    src: monumentService.getPhotoLink(monumentPhoto.id),
    alt: "photo",
  }));
  const [currentImageIndex, setCurrentIndex] = useState(0);

  const gotoPrevious = () =>
    currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

  const gotoNext = () =>
    currentImageIndex + 1 < monumentPhotos.length &&
    setCurrentIndex(currentImageIndex + 1);

  return (
    <Lightbox
      renderHeader={() => (
        <DrawerBackButton
          attachTo="left"
          onClick={() => {
            setOpen(false);
          }}
        />
      )}
      isOpen={open}
      onClose={() => setOpen(false)}
      onPrev={gotoPrevious}
      onNext={gotoNext}
      images={images}
      style={{ zIndex: 1300, backgroundColor: "black" }}
      currentIndex={currentImageIndex}
    />
  );
}
