import React, { useState } from "react";
// import DrawerImage from "http://localhost:5000/api/photo/2/image";
import { makeStyles } from "@material-ui/core";
import DrawerBackButton from "../../common/drawer-back-button/drawer-back-button";
import PhotoCarousel from "./photo-carousel/photo-carousel";

const headerHeight = 250;

const useStyles = makeStyles((theme) => ({
  imagesContainer: {
    width: "100%",
    height: headerHeight,
    backgroundSize: "cover",
    position: "relative",
    backgroundPosition: "center",
    flexShrink: 0
  },
}));

export default function DetailDrawerHeader({monument, onBack = p => p, ...props}) {
  const classes = useStyles(props);
  return (
    <div className={classes.imagesContainer}>
      <DrawerBackButton onClick={onBack} />
      <PhotoCarousel headerHeight={headerHeight} data={monument && monument.monumentPhotos}/>
    </div>
  );
}
