import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
      <MonumentDetailImage
        data={
          monument &&
          (monument.monumentPhotos.find((p) => p.majorPhoto) ||
            monument.monumentPhotos[0])
        }
        onMonumentPhotoClicked={onMonumentPhotoClicked}
      />
    </div>
  );
}
