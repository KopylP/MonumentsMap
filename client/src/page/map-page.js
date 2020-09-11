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

function MapPage(props) {
  const classes = useStyles(props);
  const [mainDrawerOpen, setMainDrawerOpen] = useState(true);
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    supportedCultures[0]
  );
  const [selectedMonument, setSelectedMonument] = useState({ id: 0 });
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedYearRange, setSelectedYearRange] = useState(yearsRange);
  const [monuments, setMonuments] = useState([]);
  const [center, setCenter] = useState(defaultCity);

  const prevSelectedLanguage = usePrevious(selectedLanguage);
  const prevSelectedConditions = usePrevious(selectedConditions);
  const prevSelectedCities = usePrevious(selectedCities);
  const prevSelectedStatuses = usePrevious(selectedStatuses);
  const prevSelectedYearRange = usePrevious(selectedYearRange);

  const [cancelRequest, setCancelRequest] = useState(null);
  const history = useHistory();
  let match = useRouteMatch();
  const makeCancelable = useCancelablePromise();

  function executor(e) {
    setCancelRequest({
      cancel: e,
    });
  }

  const update = () => {
    if (cancelRequest) {
      cancelRequest.cancel();
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
      })
      .catch(e => e); //TODO handle error
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
    doIfNotTheSame(selectedLanguage, prevSelectedLanguage, (p) => p.code)(update);
    doIfArraysNotEqual(prevSelectedYearRange, selectedYearRange)(update);
  }, [selectedConditions, selectedCities, selectedStatuses, selectedLanguage, selectedYearRange]);

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
    mainDrawerOpen,
    setMainDrawerOpen,
    selectedLanguage,
    setSelectedLanguage,
    monumentService,
    selectedMonument,
    setSelectedMonument,
    detailDrawerOpen,
    setDetailDrawerOpen,
    geocoderService,
    selectedConditions,
    setSelectedConditions,
    selectedCities,
    setSelectedCities,
    selectedStatuses,
    setSelectedStatuses,
    monuments,
    center,
    setCenter,
    selectedYearRange,
    setSelectedYearRange
  };

  return (
    <AppContext.Provider value={contextValues}>
      <div className={classes.app}>
        <FullWindowHeightContainer style={{ width: "100%" }}>
          <div className={classes.mapContainer}>
            <Map
              onMonumentSelected={
                (monumentId) => setSelectedMonument({ id: monumentId }) //TODO Move to map.js
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

export default MapPage;