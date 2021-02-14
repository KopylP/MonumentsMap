import React, { useState, useContext, useEffect } from "react";
import { useSnackbar } from "notistack";
import { Button } from "@material-ui/core";
import EditPhotoModal from "../../add-photo-modal/edit-photo-modal";
import errorNetworkSnackbar from "../../../../helpers/error-network-snackbar";
import AdminContext from "../../../../context/admin-context";
import withMonumentService from "../../../hoc-helpers/with-monument-service";
import withData from "../../../hoc-helpers/with-data";
import PhotoListSlide from "../photo-list-slide/photo-list-slide";

/**
 *
 * @param {*} data - monuments
 */
function PhotoList({ data, onUpdate = (p) => p }) {
  const {
    monumentService: { toogleMonumentMajorPhoto, deleteMonumentPhoto },
  } = useContext(AdminContext);

  const [monumentPhotos, setMonumentPhotos] = useState(
    data.map((obj) => ({ deleted: false, ...obj }))
  );

  const [editMonumentPhotoId, setEditMonumentPhotoId] = useState(null);
  const [openEditMonumentPhotoModal, setOpenEditMonumentPhotoModal] = useState(
    false
  );

  const handleSetEditMonumentPhotoId = (id) => {
    if (editMonumentPhotoId !== id) setEditMonumentPhotoId(id);
  };

  useEffect(() => {
    if (editMonumentPhotoId != null) {
      setOpenEditMonumentPhotoModal(true);
    }
  }, [editMonumentPhotoId]);

  const onCloseModalEnded = () => {
    setEditMonumentPhotoId(null);
    onUpdate();
  };

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

  const errorSnackbar = (e) => {
    errorNetworkSnackbar(enqueueSnackbar, e.response);
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
            .then(f => f)
            .catch((e) => {
              onDeleteMonumentPhotoError(e, monumentPhotoIndex);
            });
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
        <PhotoListSlide
          monumentPhoto={monumentPhoto}
          index={i}
          key={i}
          onDeleteMonumentPhoto={onDeleteMonumentPhoto}
          setMonumentMajorPhotoByIndex={setMonumentMajorPhotoByIndex}
          onDelete={hideMonumentPhoto}
          onEdit={handleSetEditMonumentPhotoId}
        />
      ))}
        <EditPhotoModal
          monumentPhotoId={editMonumentPhotoId}
          onCloseAnimationEnded={onCloseModalEnded}
          onClose={() => setEditMonumentPhotoId(null)}
        />
    </React.Fragment>
  );
}

export default withMonumentService(withData(PhotoList))((monumentService) => ({
  getData: monumentService.getMonumentPhotos,
}));
