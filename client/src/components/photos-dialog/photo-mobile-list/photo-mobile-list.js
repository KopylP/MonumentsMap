import React, { useContext, useState } from "react";
import {
  Slide,
  Dialog,
  Toolbar,
  Typography,
  AppBar,
  GridList,
  GridListTile,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AppContext from "../../../context/app-context";
import PhotoLightbox from "../photo-lightbox/photo-lightbox";

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
    display: "block"
  }
}));

export default function PhotoMobileList({ open, setOpen, monumentPhotos }) {
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };

  const { monumentService: { getPhotoLink }, selectedMonument: { name } } = useContext(AppContext);

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [openLightbox, setOpenLightbox] = useState(false);
  const [selectedMonumentPhotoIndex, setSelectedMonumentPhotoIndex] = useState(false);

  const handleImageClick = (monumentPhotoIndex) => {
      setSelectedMonumentPhotoIndex(monumentPhotoIndex);
      setOpenLightbox(true);
  }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      style={{
        boxSizing: "border-box",
      }}
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
            { name }
          </Typography>
        </Toolbar>
      </AppBar>
      <GridList
        cellHeight={160}
        style={{ width: "100%", marginTop: 5 }}
        cols={2}
      >
        {monumentPhotos.map((monumentPhoto, i) => (
          <GridListTile key={monumentPhoto.id} cols={1}>
            <img
              src={getPhotoLink(monumentPhoto.photoId, 500)}
              alt={monumentPhoto.id}
              onClick={() => handleImageClick(i)}
            />
          </GridListTile>
        ))}
      </GridList>
      <PhotoLightbox
        open={openLightbox}
        setOpen={setOpenLightbox}
        monumentPhotos={monumentPhotos}
        initIndex={selectedMonumentPhotoIndex}
      />
    </Dialog>
  );
}
