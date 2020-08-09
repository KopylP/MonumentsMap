import React, { useState } from "react";
// import DrawerImage from "http://localhost:5000/api/photo/2/image";
import { makeStyles } from "@material-ui/core";
import DrawerBackButton from "../../common/drawer-back-button/drawer-back-button";
import PhotoCarousel from "./photo-carousel/photo-carousel";

const useStyles = makeStyles((theme) => ({
  imagesContainer: {
    width: "100%",
    height: theme.detailDrawerHeaderHeight,
    backgroundSize: "cover",
    position: "relative",
    backgroundPosition: "center",
    flexShrink: 0
  },
}));

export default function DetailDrawerHeader({monument, onBack = p => p, onMonumentPhotoClicked = p => p}) {
  const classes = useStyles();
  return (
    <div className={classes.imagesContainer}>
      <DrawerBackButton onClick={onBack} />
      <PhotoCarousel data={monument && monument.monumentPhotos} onMonumentPhotoClicked={onMonumentPhotoClicked}/>
    </div>
  );
}
