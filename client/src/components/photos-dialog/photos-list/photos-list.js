import React, { useContext } from "react";
import { GridList, GridListTile, makeStyles } from "@material-ui/core";
import AppContext from "../../../context/app-context";

const useStyles = makeStyles((theme) => ({
  selectedGridListTile: {
    borderWidth: 2,
    borderColor: theme.palette.primary.main,
    borderStyle: "solid"
  },
}));

export default function PhotosList({
  monumentPhotos,
  selectedMonumentPhotoIndex,
  setSelectedMonumentPhotoIndex,
}) {
  const { monumentService } = useContext(AppContext);
  const classes = useStyles();
  return (
    <GridList cols={1} cellHeight={250}>
      {monumentPhotos.map((monumentPhoto, i) => (
        <GridListTile
          key={monumentPhoto.id}
          className={
            selectedMonumentPhotoIndex === i
              ? classes.selectedGridListTile
              : null
          }
        >
          <img
            onClick={() => setSelectedMonumentPhotoIndex(i)}
            src={monumentService.getPhotoLink(monumentPhoto.photoId)}
          />
        </GridListTile>
      ))}
    </GridList>
  );
}
