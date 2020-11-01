import React, { useContext, useState, useEffect } from "react";
import DrawerContainer from "../../common/drawer-container/drawer-container";
import DetailDrawerHeader from "../detail-drawer-header/detail-drawer-header";
import DetailDrawerContent from "../detail-drawer-content/detail-drawer-content";
import AppContext from "../../../context/app-context";
import useCancelablePromise from "@rodw95/use-cancelable-promise";
import { showErrorSnackbar } from "../../helpers/snackbar-helpers";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { detailDrawerTransitionDuration } from "../config";
import { connect } from "react-redux";

function DetailDrawerRoot({ selectedMonument, detailDrawerOpen }) {
  const { monumentService } = useContext(AppContext);

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

  useEffect(() => {
    if (selectedMonument && detailDrawerOpen) {
      setMonument(null);
      loadMonument();
    }
  }, [detailDrawerOpen]);


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

const bindStateToProps = ({ detailMonument: { selectedMonument, detailDrawerOpen } }) => ({
  selectedMonument,
  detailDrawerOpen
});

export default connect(bindStateToProps)(DetailDrawerRoot);
