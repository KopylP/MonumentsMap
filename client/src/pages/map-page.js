import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import MainDrawer from "../components/drawer/main-drawer";
import AppContext from "../context/app-context";
import MenuButton from "../components/common/menu-button/menu-button";
import Map from "../components/map/map";
import {
  supportedCultures,
  serverHost,
  defaultCity,
  defaultClientCulture,
  yearsRange,
} from "../config";
import MonumentService from "../services/monument-service";
import DetailDrawer from "../components/detail-drawer/detail-drawer";
import GeocoderService from "../services/geocoder-service";
import { usePrevious } from "../hooks/hooks";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useHistory,
} from "react-router-dom";
import FullWindowHeightContainer from "../components/common/full-window-height-container/full-window-height-container";
import useCancelablePromise from "@rodw95/use-cancelable-promise";
import {
  doIfNotTheSame,
  doIfNotZero,
  doIfArraysNotEqual,
} from "../components/helpers/conditions";
import { defineClientCulture } from "../components/helpers/lang";
import withStore from "../store/with-store";

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
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    height: "100vh",
    width: "100vw",
  },
}));

function MapPage({ store }) {
  const classes = useStyles();
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

  const closeMonumentsLoading = () => {
    setTimeout(() => {
      setLoadingMonuments(false);
    }, 200);
  }

  function executor(e) {
    setCancelRequest({
      cancel: e,
    });
  }

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
      .then((monuments) => {
        setMonuments(monuments);
        closeMonumentsLoading();
      })
      .catch((e) => {
        closeMonumentsLoading();
        //TODO show snackbar
      });
  };

  useEffect(() => {
    doIfNotZero(selectedMonument.id)(() =>
      history.push(`${match.path}monument/${selectedMonument.id}`)
    );
  }, [selectedMonument]);

  useEffect(() => {
    doIfArraysNotEqual(prevSelectedConditions, selectedConditions)(update);
    doIfArraysNotEqual(prevSelectedStatuses, selectedStatuses)(update);
    doIfArraysNotEqual(prevSelectedCities, selectedCities)(update);
    doIfNotTheSame(
      selectedLanguage,
      prevSelectedLanguage,
      (p) => p.code
    )(update);
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
        <FullWindowHeightContainer style={{ width: "100%" }}>
          <div className={classes.mapContainer}>
            <Map
              onMonumentSelected={(monumentId) =>
                setSelectedMonument({
                  ...monuments.find((p) => p.id === monumentId),
                })
              }
            />
          </div>
        </FullWindowHeightContainer>
        <MenuButton
          className={classes.menuButton}
          onClick={() => setMainDrawerOpen(true)}
        />
      </div>
      <MainDrawer />
      <Switch>
        <Route path={`${match.path}monument/:monumentId`}>
          <DetailDrawer />
        </Route>
      </Switch>
    </AppContext.Provider>
  );
}

export default withStore(MapPage); 