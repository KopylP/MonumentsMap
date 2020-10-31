import React, { useContext, useState, useEffect } from "react";
import DrawerContainer from "../../common/drawer-container/drawer-container";
import DetailDrawerHeader from "../detail-drawer-header/detail-drawer-header";
import DetailDrawerContent from "../detail-drawer-content/detail-drawer-content";
import AppContext from "../../../context/app-context";
import { usePrevious } from "../../../hooks/hooks";
import useCancelablePromise from "@rodw95/use-cancelable-promise";
import { showErrorSnackbar } from "../../helpers/snackbar-helpers";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { detailDrawerTransitionDuration } from "../config";

export default function DetailDrawerRoot() {
  const { monumentService, selectedMonument } = useContext(AppContext);

  const [monument, setMonument] = useState(null);

  const makeCancelable = useCancelablePromise();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const onMonumentLoad = (monument) => {
    setMonument(monument);
  };

  const onMonumentPhotoClicked = () => {
    // TODO open detail information
  };

  const loadMonument = () => {
    setTimeout(() => {
      makeCancelable(monumentService.getMonumentById(selectedMonument.id))
        .then(onMonumentLoad)
        .catch(() => {
          showErrorSnackbar(enqueueSnackbar, t("Network error"));
        });
    }, detailDrawerTransitionDuration); // wait until drawer will opened
  };

  const prevSelectedMonument = usePrevious(selectedMonument);

  useEffect(() => {
    if (
      selectedMonument &&
      (typeof prevSelectedMonument == "undefined" ||
        (selectedMonument.id !== 0 &&
          prevSelectedMonument.id !== selectedMonument.id))
    ) {
      setMonument(null);
      loadMonument();
    }
  }, [selectedMonument]);

  return (
    <DrawerContainer>
      <DetailDrawerHeader
        monument={monument}
        onMonumentPhotoClicked={onMonumentPhotoClicked}
      />
      <DetailDrawerContent monument={monument} />
    </DrawerContainer>
  );
}
