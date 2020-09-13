import React, { useState } from "react";
// import DrawerImage from "http://localhost:5000/api/photo/2/image";
import { makeStyles } from "@material-ui/core";
import DrawerBackButton from "../../common/drawer-back-button/drawer-back-button";
import PhotoCarousel from "./photo-carousel/photo-carousel";
import { isMobileOnly } from "react-device-detect";
import MonumentDetailImage from "./monument-detail-image/monument-detail-image";

const useStyles = makeStyles((theme) => ({
  imagesContainer: {
    width: "100%",
    height: theme.detailDrawerHeaderHeight,
    flexShrink: 0,
  },
}));

export default function DetailDrawerHeader({
  monument,
  onMonumentPhotoClicked = (p) => p,
}) {
  const classes = useStyles();
  return (
    <div className={classes.imagesContainer}>
      {isMobileOnly ? (
        <MonumentDetailImage
          data={monument && monument.monumentPhotos.find((p) => p.majorPhoto)}
          onMonumentPhotoClicked={onMonumentPhotoClicked}
        />
      ) : (
        <PhotoCarousel
          data={monument && monument.monumentPhotos}
          onMonumentPhotoClicked={onMonumentPhotoClicked}
        />
      )}
    </div>
  );
}
