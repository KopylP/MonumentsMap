import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MainDrawer from "../components/drawer/main-drawer";
import AppContext from "../context/app-context";
import MenuButton from "../components/common/menu-button/menu-button";
import Map from "../components/map/map";
import DetailDrawer from "../components/detail-drawer/detail-drawer";
import { usePrevious } from "../hooks/hooks";
import useCancelablePromise from "@rodw95/use-cancelable-promise";
import {
  doIfNotTheSame,
  doIfArraysNotEqual,
} from "../components/helpers/conditions";
import { useSnackbar } from "notistack";
import { useTranslation, withTranslation } from "react-i18next";
import MyLocation from "../components/map/my-location/my-location";
import { showErrorSnackbar } from "../components/helpers/snackbar-helpers";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    position: "fixed",
    left: 50,
    top: 10,
    zIndex: 999,
  },
  app: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    display: "flex",
  },
  mapContainer: {
    flexGrow: 1,
  },
}));

function MapPage() {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {
    selectedLanguage,
    selectedConditions,
    selectedCities,
    selectedStatuses,
    selectedYearRange,
    setMainDrawerOpen,
    monuments,
    setMonuments,
    handleMonumentSelected,
    monumentService,
    loadingMonuments,
    setLoadingMonuments,
  } = useContext(AppContext);

  const { t } = useTranslation();

  const prevSelectedLanguage = usePrevious(selectedLanguage);
  const prevSelectedConditions = usePrevious(selectedConditions);
  const prevSelectedCities = usePrevious(selectedCities);
  const prevSelectedStatuses = usePrevious(selectedStatuses);
  const prevSelectedYearRange = usePrevious(selectedYearRange);

  const [cancelRequest, setCancelRequest] = useState(null);
  const [firstLoading, setFirstLoading] = useState(true);

  const makeCancelable = useCancelablePromise();

  const closeMonumentsLoading = (action = (p) => p) => {
    setTimeout(() => {
      setLoadingMonuments(false);
      firstLoading && handleFirstLoading();
      action();
    }, 300);
  };

  const handleFirstLoading = () => {
    const loadImage = document.getElementById("bundle-loader");
    loadImage.style.pointerEvents = "none";
    loadImage.style.opacity = 0;
    setTimeout(() => {
      loadImage.remove();
    }, 1000);
    setFirstLoading(false);
  };

  function executor(e) {
    setCancelRequest({
      cancel: e,
    });
  }

  const showSnackbar = (message) => {
    enqueueSnackbar(message, {
      variant: "info",
      anchorOrigin: { horizontal: "center", vertical: "bottom" },
      autoHideDuration: 1500,
    });
  };

  const handleMonumentsLoading = (monuments) => {
    const monumentsNotFound = () => {
      if (monuments.length === 0) {
        showSnackbar(t("No monuments were found by such criteria"));
      } else {
        closeSnackbar();
      }
    };
    setMonuments(monuments);
    closeMonumentsLoading(monumentsNotFound);
  };

  const update = () => {
    if (cancelRequest) {
      cancelRequest.cancel();
    }

    if (!loadingMonuments) {
      setLoadingMonuments(true);
    }

    makeCancelable(
      monumentService.getMonumentsByFilter(
        selectedCities.map((c) => c.id),
        selectedStatuses,
        selectedConditions,
        selectedYearRange,
        executor
      )
    )
      .then(handleMonumentsLoading)
      .catch((e) => {
        if (!Axios.isCancel(e)) {
          closeMonumentsLoading();
          showErrorSnackbar(enqueueSnackbar, t("Network error"));
        }
      });
  };

  const handleSelectLanguage = () => {
    update();
  };

  useEffect(() => {
    doIfArraysNotEqual(prevSelectedConditions, selectedConditions)(update);
    doIfArraysNotEqual(prevSelectedStatuses, selectedStatuses)(update);
    doIfArraysNotEqual(prevSelectedCities, selectedCities, (p) => p.id)(update);
    doIfNotTheSame(
      selectedLanguage,
      prevSelectedLanguage,
      (p) => p.code
    )(handleSelectLanguage);
  }, [selectedConditions, selectedCities, selectedStatuses, selectedLanguage]);

  useEffect(() => {
    doIfArraysNotEqual(prevSelectedYearRange, selectedYearRange)(update);
  }, [selectedYearRange]);

  return (
    <div
      className={classes.app}
      style={{ visibility: firstLoading ? "hidden" : "visible" }}
    >
      <Map
        onMonumentSelected={(monumentId) =>
          handleMonumentSelected(
            monuments.find((p) => p.id === monumentId),
            false
          )
        }
      />
      <MenuButton
        className={classes.menuButton}
        onClick={() => setMainDrawerOpen(true)}
      />
      <MainDrawer />
      <DetailDrawer />
      <MyLocation />
    </div>
  );
}

export default withTranslation()(MapPage);
