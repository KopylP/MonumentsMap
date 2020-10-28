import React from "react";
import { makeStyles } from "@material-ui/core";
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
      {/* {isMobileOnly ? ( */}
      <MonumentDetailImage
        data={
          monument &&
          (monument.monumentPhotos.find((p) => p.majorPhoto) ||
            monument.monumentPhotos[0])
        }
        onMonumentPhotoClicked={onMonumentPhotoClicked}
      />
      {/* ) : (
        <PhotoCarousel
          data={monument && monument.monumentPhotos}
          onMonumentPhotoClicked={onMonumentPhotoClicked}
        />
      )} */}
    </div>
  );
}
