import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import MainDrawer from "../components/drawer/main-drawer";
import AppContext from "../context/app-context";
import MenuButton from "../components/common/menu-button/menu-button";
import Map from "../components/map/map";
import { supportedCultures, serverHost, defaultClientCulture } from "../config";
import MonumentService from "../services/monument-service";
import DetailDrawer from "../components/detail-drawer/detail-drawer";
import GeocoderService from "../services/geocoder-service";
import { usePrevious } from "../hooks/hooks";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import useCancelablePromise from "@rodw95/use-cancelable-promise";
import {
  doIfNotTheSame,
  doIfNotZero,
  doIfArraysNotEqual,
} from "../components/helpers/conditions";
import { defineClientCulture } from "../components/helpers/lang";
import withStore from "../store/with-store";
import { useSnackbar } from "notistack";
import { withTranslation } from "react-i18next";
import MyLocation from "../components/map/my-location/my-location";
import { showErrorSnackbar } from "../components/helpers/snackbar-helpers";

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
    display: "flex",
    zIndex: 1,
  },
  mapContainer: {
    flexGrow: 1,
  },
}));

function MapPage({ store, i18n, t }) {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {
    selectedLanguage,
    setSelectedLanguage,
    selectedConditions,
    selectedCities,
    selectedStatuses,
    selectedYearRange,
    selectedMonument,
    setMainDrawerOpen,
    monuments,
    setMonuments,
    setSelectedMonument,
    loadingMonuments,
    setLoadingMonuments,
  } = store;

  const prevSelectedLanguage = usePrevious(selectedLanguage);
  const prevSelectedConditions = usePrevious(selectedConditions);
  const prevSelectedCities = usePrevious(selectedCities);
  const prevSelectedStatuses = usePrevious(selectedStatuses);
  const prevSelectedYearRange = usePrevious(selectedYearRange);

  const [cancelRequest, setCancelRequest] = useState(null);
  const history = useHistory();
  let match = useRouteMatch();
  const makeCancelable = useCancelablePromise();

  const closeMonumentsLoading = (action = (p) => p) => {
    setTimeout(() => {
      setLoadingMonuments(false);
      action();
    }, 300);
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
        closeMonumentsLoading();
        showErrorSnackbar(enqueueSnackbar, t("Network error"));
      });
  };

  const handleSelectedMonumentChange = () => {
    doIfNotZero(selectedMonument.id)(() => {
      if (!selectedMonument.slug || selectedMonument.slug == "")
      {
        history.push(`${match.path}monument/${selectedMonument.id}`);
      } else {
        history.push(`${match.path}monument/${selectedMonument.slug}`);
      }
    });
  };

  useEffect(handleSelectedMonumentChange, [selectedMonument]);

  const handleSelectLanguage = () => {
    i18n.changeLanguage(selectedLanguage.code.split("-")[0]);
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

  useEffect(
    () =>
      setSelectedLanguage(
        defineClientCulture(supportedCultures, defaultClientCulture)
      ),
    []
  );

  const monumentService = new MonumentService(
    serverHost,
    selectedLanguage.code
  );

  const geocoderService = new GeocoderService(
    selectedLanguage.code.split("-")[0]
  );

  const contextValues = {
    ...store,
    monumentService,
    geocoderService,
  };

  return (
    <AppContext.Provider value={contextValues}>
      <div className={classes.app}>
        <Map
          onMonumentSelected={(monumentId) =>
            setSelectedMonument({
              ...monuments.find((p) => p.id === monumentId),
            })
          }
        />
        <MenuButton
          className={classes.menuButton}
          onClick={() => setMainDrawerOpen(true)}
        />
        <MainDrawer />
        <Switch>
          <Route path={`${match.path}monument/:monumentId`}>
            <DetailDrawer />
          </Route>
        </Switch>
        <MyLocation />
      </div>
    </AppContext.Provider>
  );
}

export default withTranslation()(withStore(MapPage));
