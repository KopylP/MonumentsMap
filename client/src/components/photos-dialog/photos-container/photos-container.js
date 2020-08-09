import React, { useState } from "react";
import { Dialog, Fade, Grid, Box, makeStyles } from "@material-ui/core";
import PhotosList from "../photos-list/photos-list";
import DrawerBackButton from "../../common/drawer-back-button/drawer-back-button";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "sterch",
  },
  photoListBox: {
    width: theme.detailDrawerWidth,
    marginRight: 5,
  },
  photoBox: {
    width: "100%",
    height: "100%",
  },
}));

export default function PhotosContainer({
  firstMonumentPhotoId,
  monumentPhotos,
  onBack,
}) {
  const classes = useStyles();
  const [selectedMonumentPhotoIndex, setSelectedMonumentPhotoIndex] = useState(
    0
  );

  const sortedMonumentPhotos = monumentPhotos.sort((a, b) => {
    if (a.id === firstMonumentPhotoId) return -1;
    if (b.id === firstMonumentPhotoId) return 1;
    else return 0;
  });

  return (
    <div className={classes.container}>
      <DrawerBackButton attachTo="left" onClick={onBack}/>
      <Box
        component="div"
        display={{ xs: "none", md: "block" }}
        className={classes.photoListBox}
      >
        <PhotosList
          selectedMonumentPhotoIndex={selectedMonumentPhotoIndex}
          setSelectedMonumentPhotoIndex={setSelectedMonumentPhotoIndex}
          monumentPhotos={sortedMonumentPhotos}
        />
      </Box>
      <Box component="div" className={classes.photoBox}>
      </Box>
    </div>
  );
}
