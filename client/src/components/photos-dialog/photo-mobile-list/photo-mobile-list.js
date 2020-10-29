import React, { useContext, useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { makeStyles } from "@material-ui/core/styles";
import AppContext from "../../../context/app-context";
import PhotoLightbox from "../photo-lightbox/photo-lightbox";
import useCancelablePromise from "@rodw95/use-cancelable-promise";
import sortMonumentPhotos from "../../helpers/sort-monument-photos";
import PhotoListAppBar from "./photo-list-app-bar/photo-list-app-bar";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { showErrorSnackbar } from "../../helpers/snackbar-helpers";

const useStyles = makeStyles((theme) => ({
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
    overflow: "hidden",
  },
}));

export default function PhotoMobileList({ open, setOpen, monumentPhotoId }) {
  const makeCancelable = useCancelablePromise();
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };
  const [monumentPhotos, setMonumentPhotos] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const {
    monumentService: { getPhotoLink, getMonumentPhotos },
    selectedMonument: { name },
  } = useContext(AppContext);

  useEffect(() => {
    if (open && monumentPhotoId != null) {
      makeCancelable(getMonumentPhotos(monumentPhotoId))
        .then((monumentPhotos) =>
          setMonumentPhotos(monumentPhotos.sort(sortMonumentPhotos))
        )
        .catch(() => {
          showErrorSnackbar(enqueueSnackbar, t("Network error"));
        });
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
      <PhotoListAppBar name={name} onBackButtonClick={() => setOpen(false)} />
        <GridList cellHeight={160} cols={2} style={{ margin: 0, transform: "translate(0px, -2px)" }}>
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
