import React, { useState, useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import DetailDescription from "../../detail-drawer/detail-description/detail-description";
import AppContext from "../../../context/app-context";
import PhotoDrawerContentTitle from "./photo-drawer-content-title/photo-drawer-content-title";
import useCancelablePromise from "@rodw95/use-cancelable-promise";
import SourceList from "../../common/sources/source-list";
import ScrollBar from "../../common/scroll-bar/scroll-bar";
import { showErrorSnackbar } from "../../helpers/snackbar-helpers";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function PhotoDrawerContent({
  monumentPhoto,
  onBack = (p) => p,
}) {
  const [monumentPhotoDetail, setMonumentPhotoDetail] = useState(null);
  const { monumentService } = useContext(AppContext);
  const classes = useStyles();
  const makeCancelable = useCancelablePromise();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const onMonumentPhotoLoad = (monumentPhoto) => {
    setMonumentPhotoDetail(monumentPhoto);
  };

  const onMonumentPhotoError = () => {
    showErrorSnackbar(enqueueSnackbar, t("Network error"));
  };

  const update = () => {
    setMonumentPhotoDetail(null);
    makeCancelable(monumentService.getMonumentPhoto(monumentPhoto.id))
      .then(onMonumentPhotoLoad)
      .catch(onMonumentPhotoError);
  };

  useEffect(() => {
    update();
  }, [monumentPhoto]);

  return (
    <ScrollBar>
      <div className={classes.root}>
        <PhotoDrawerContentTitle
          monumentPhoto={monumentPhotoDetail}
          onBack={onBack}
        />
        <div style={{ padding: 15 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DetailDescription
                data={monumentPhotoDetail && monumentPhotoDetail.description}
              />
              <SourceList
                data={monumentPhotoDetail && monumentPhotoDetail.sources}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </ScrollBar>
  );
}
