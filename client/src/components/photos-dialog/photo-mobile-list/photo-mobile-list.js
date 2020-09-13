import React, { memo, useContext, useEffect, useState } from "react";
import {
  Dialog,
  Toolbar,
  Typography,
  AppBar,
  GridList,
  GridListTile,
  IconButton,
  makeStyles, Grid
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AppContext from "../../../context/app-context";
import PhotoLightbox from "../photo-lightbox/photo-lightbox";
import useCancelablePromise from "@rodw95/use-cancelable-promise";
import sortMonumentPhotos from "../../helpers/sort-monument-photos";

const useStyles = makeStyles((theme) => ({
  backButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "white",
  },
  monumentName: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    flexGrow: 1,
    display: "block",
  },
  photoMobileListContainer: {
    boxSizing: "border-box",
    overflow: "hidden"
  }
}));

export default function PhotoMobileList({ open, setOpen, monumentPhotoId }) {
  const makeCancelable = useCancelablePromise();
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };
  const [monumentPhotos, setMonumentPhotos] = useState([]);

  const {
    monumentService: { getPhotoLink, getMonumentPhotos },
    selectedMonument: { name },
  } = useContext(AppContext);

  useEffect(() => {
    if (open && monumentPhotoId != null) {
      makeCancelable(getMonumentPhotos(monumentPhotoId))
        .then((monumentPhotos) => setMonumentPhotos(monumentPhotos.sort(sortMonumentPhotos)))
        .catch(); //TODO handle error
    }
  }, [open]);

  const [openLightbox, setOpenLightbox] = useState(false);
  const [selectedMonumentPhotoIndex, setSelectedMonumentPhotoIndex] = useState(
    null
  );

  const handleImageClick = (monumentPhotoIndex) => {
    setSelectedMonumentPhotoIndex(monumentPhotoIndex);
    setOpenLightbox(true);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      className={classes.photoMobileListContainer}
    >
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.backButton}
            color="inherit"
            onClick={() => setOpen(false)}
          >
            <ArrowBackIcon style={{ color: "white" }} />
          </IconButton>
          <Typography variant="subtitle1" className={classes.monumentName}>
            {name}
          </Typography>
        </Toolbar>
      </AppBar>
      <GridList
        cellHeight={160}
        style={{flexGrow: 1 }}
        cols={2}
      >
        {monumentPhotos.map((monumentPhoto, i) => (
          <GridListTile key={monumentPhoto.id} cols={1}>
            <img
              src={getPhotoLink(monumentPhoto.photoId, 400)}
              alt={monumentPhoto.id}
              onClick={() => handleImageClick(i)}
            />
          </GridListTile>
        ))}
      </GridList>
      {monumentPhotos.length > 0 && (
        <PhotoLightbox
          open={openLightbox}
          setOpen={setOpenLightbox}
          monumentPhotos={monumentPhotos}
          initIndex={selectedMonumentPhotoIndex}
        />
      )}
    </Dialog>
  );
}
