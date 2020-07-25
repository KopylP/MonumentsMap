import React, { useState, useContext } from "react";
import withMonumentService from "../../../../hoc-helpers/with-monument-service";
import withData from "../../../../hoc-helpers/with-data";
import MonumentPhotoListItem from "../photo-list-item/monument-photo-list-item";
import AppContext from "../../../../../context/app-context";
import { SnackbarProvider, useSnackbar } from "notistack";
import { Button } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import errorNetworkSnackbar from "../../../../helpers/error-network-snackbar";
/**
 *
 * @param {*} data - monuments
 */
function PhotoList({ data }) {
  const {
    monumentService: { toogleMonumentMajorPhoto, deleteMonumentPhoto },
  } = useContext(AppContext);

  const [monumentPhotos, setMonumentPhotos] = useState(
    data.map((obj) => ({ deleted: false, ...obj }))
  );

  const onMonumentTooglePhotoError = (e, index, oldValue) => {
    const monumentPhotosModify = [...monumentPhotos];
    monumentPhotos[index].majorPhoto = oldValue;
    setMonumentPhotos(monumentPhotosModify);
    errorSnackbar(e.response && e.response.status);
  };

  const onDeleteMonumentPhotoError = (e, i) => {
    showMonumentPhoto(i);
    errorSnackbar(e.response && e.response.status);
  };

  const setMonumentMajorPhotoByIndex = (index, isMajorPhoto) => {
    const monumentPhotosModify = [...monumentPhotos];
    if (isMajorPhoto) {
      const prevMajorPhotoIndex = monumentPhotosModify.findIndex(
        (p) => p.majorPhoto
      );
      if (prevMajorPhotoIndex > -1) {
        monumentPhotosModify[prevMajorPhotoIndex].majorPhoto = false;
      }
    }
    monumentPhotosModify[index].majorPhoto = isMajorPhoto;
    toogleMonumentMajorPhoto(monumentPhotosModify[index].id)
      .then((e) => console.log(e))
      .catch((e) => onMonumentTooglePhotoError(e, index, !isMajorPhoto));
    setMonumentPhotos(monumentPhotosModify);
  };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const errorSnackbar = (status) => {
    errorNetworkSnackbar(enqueueSnackbar, status);
  };

  const showMonumentPhoto = (index) => {
    const monumentPhotosModify = [...monumentPhotos];
    monumentPhotosModify[index].deleted = false;
    setMonumentPhotos(monumentPhotosModify);
  };

  const hideMonumentPhoto = (index) => {
    const monumentPhotosModify = [...monumentPhotos];
    monumentPhotosModify[index].deleted = true;
    setMonumentPhotos(monumentPhotosModify);
  };

  const undoDeleteSnackBar = (monumentPhotoIndex) => {
    const action = (key) => (
      <Button
        onClick={() => {
          closeSnackbar(key);
          showMonumentPhoto(monumentPhotoIndex);
        }}
      >
        Відмінити
      </Button>
    );

    enqueueSnackbar("Фото видалено", {
      variant: "info",
      action,
      autoHideDuration: 2000,
      onClose: (_, reason) => {
        if (reason === "timeout") {
          deleteMonumentPhoto(monumentPhotos[monumentPhotoIndex].id)
            .then((e) => console.log(e))
            .catch((e) => { onDeleteMonumentPhotoError(e, monumentPhotoIndex); console.log("onDelete", e); });
        }
      },
    });
  };

  const onDeleteMonumentPhoto = (index) => {
    undoDeleteSnackBar(index);
  };

  return (
    <React.Fragment>
      {monumentPhotos.map((monumentPhoto, i) => (
        <Slide
          key={i}
          style={{ margin: 10 }}
          in={!monumentPhoto.deleted}
          direction="up"
          mountOnEnter
          unmountOnExit
          onExited={() => onDeleteMonumentPhoto(i)}
        >
          <div>
            <MonumentPhotoListItem
              index={i}
              monumentPhoto={monumentPhoto}
              setMonumentMajorPhotoByIndex={setMonumentMajorPhotoByIndex}
              onDelete={() => hideMonumentPhoto(i)}
            />
          </div>
        </Slide>
      ))}
    </React.Fragment>
  );
}

export default withMonumentService(withData(PhotoList))((monumentService) => ({
  getData: monumentService.getMonumentPhotos,
}));
