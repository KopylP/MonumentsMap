import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppContext from "../../../context/app-context";

const useStyles = makeStyles((theme) => ({
  list: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  img: {
    maxWidth: 100,
    height: 65,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    boxSizing: "border-box",
    // maxHeight: 70,
    objectFit: "cover",
    flexGrow: 1,
  },
  imgBorder: {
    borderStyle: "solid",
    borderColor: theme.palette.primary.main,
    borderWidth: 3,
    backgroundColor: "black"
  },
  imgWhiteBorder: {
    borderStyle: "solid",
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: "black"
  }
}));

export default function PhotosList({
  monumentPhotos,
  selectedMonumentPhotoIndex,
  onMonumentPhotoClick,
}) {
  const classes = useStyles();
  const { monumentService } = useContext(AppContext);
  return (
    <div className={classes.list}>
      {monumentPhotos.map((monumentPhoto, i) => {
        return (
          <img
            key={monumentPhoto.photoId}
            src={monumentService.getPhotoLink(monumentPhoto.photoId, 200)}
            alt="no alt"
            onClick={() => onMonumentPhotoClick(i)}
            className={`${classes.img} ${
              selectedMonumentPhotoIndex === i ? classes.imgBorder : classes.imgWhiteBorder
            }`}
          />
        );
      })}
    </div>
  );
}
