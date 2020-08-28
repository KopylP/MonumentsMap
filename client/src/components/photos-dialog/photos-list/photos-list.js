import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GridList } from "@material-ui/core";
import AppContext from "../../../context/app-context";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  img: {
    maxWidth: 100,
    height: "auto",
    marginLeft: 5,
    marginRight: 5,
    boxSizing: "border-box",
    maxHeight: 70,
    objectFit: "scale-down"
  },
  imgBorder: {
    borderStyle: "solid",
    borderColor: theme.palette.primary.main,
    borderWidth: 3,
  },
}));

export default function PhotosList({
  monumentPhotos,
  selectedMonumentPhotoIndex,
  onMonumentPhotoClick,
}) {
  const classes = useStyles();
  const { monumentService } = useContext(AppContext);
  return (
    <div className={classes.root}>
      {monumentPhotos.map((monumentPhoto, i) => {
        return (
          <img
            key={monumentPhoto.photoId}
            src={monumentService.getPhotoLink(monumentPhoto.photoId, 200)}
            alt="no alt"
            onClick={() => onMonumentPhotoClick(i)}
            className={`${classes.img} ${
              selectedMonumentPhotoIndex === i ? classes.imgBorder : null
            }`}
          />
        );
      })}
    </div>
  );
}
