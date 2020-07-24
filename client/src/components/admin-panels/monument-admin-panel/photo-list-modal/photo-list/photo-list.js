import React, { useState, useContext } from "react";
import withMonumentService from "../../../../hoc-helpers/with-monument-service";
import withData from "../../../../hoc-helpers/with-data";
import MonumentPhotoListItem from "../photo-list-item/monument-photo-list-item";
import AppContext from "../../../../../context/app-context";
import { SnackbarProvider, useSnackbar } from "notistack";

/**
 *
 * @param {*} data - monuments
 */
function PhotoList({ data }) {
  const {
    monumentService: { toogleMonumentMajorPhoto },
  } = useContext(AppContext);

  const onMonumentTooglePhotoError = (index, oldValue) => {
    const majorPhotosModify = [...majorPhotos];
    majorPhotosModify[index] = oldValue;
    data[index].majorPhoto = oldValue;
    setMajorPhotos(majorPhotosModify);
    errorSnackbar();
  };

  const setMonumentMajorPhotoByIndex = (index, isMajorPhoto) => {
    data[index].majorPhoto = isMajorPhoto;

    const majorPhotosModify = [...majorPhotos];

    if (isMajorPhoto) {
      const prevMajorPhotoIndex = majorPhotos.indexOf(isMajorPhoto);
      if (prevMajorPhotoIndex > -1) {
        majorPhotosModify[prevMajorPhotoIndex] = false;
        data[prevMajorPhotoIndex].monumentPhoto = false;
      }
    }

    majorPhotosModify[index] = isMajorPhoto;
    toogleMonumentMajorPhoto(data[index].id)
      .then((e) => console.log(e))
      .catch((e) => onMonumentTooglePhotoError(index, !isMajorPhoto));
    setMajorPhotos(majorPhotosModify);
  };

  const [majorPhotos, setMajorPhotos] = useState(data.map((p) => p.majorPhoto));

  const { enqueueSnackbar } = useSnackbar();

  const errorSnackbar = () => {
    enqueueSnackbar("Не вдалося зберегти зміни", { variant: "error" });
    //TODO language
  };

  return (
    <React.Fragment>
      {data.map((monumentPhoto, i) => (
        <MonumentPhotoListItem
          style={{ margin: 10 }}
          key={i}
          index={i}
          isMajorPhoto={majorPhotos[i]}
          monumentPhoto={monumentPhoto}
          setMonumentMajorPhotoByIndex={setMonumentMajorPhotoByIndex}
        />
      ))}
    </React.Fragment>
  );
}

export default withMonumentService(withData(PhotoList))((monumentService) => ({
  getData: monumentService.getMonumentPhotos,
}));
