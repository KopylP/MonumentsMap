import React, { useState, useEffect } from "react";
import { SnackbarProvider } from "notistack";
import {
  createMuiTheme,
  MuiThemeProvider,
  makeStyles,
} from "@material-ui/core";
import MainDrawer from "../components/drawer/main-drawer";
import AppContext from "../context/app-context";
import MenuButton from "../components/common/menu-button/menu-button";
import Map from "../components/map/map";
import { supportedCultures, serverHost, defaultCity } from "../config";
import MonumentService from "../services/monument-service";
import DetailDrawer from "../components/detail-drawer/detail-drawer";
import GeocoderService from "../services/geocoder-service";
import { usePrevious } from "../hooks/hooks";
import { arraysEqual } from "../components/helpers/array-helpers";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useHistory,
} from "react-router-dom";
import { isMobile } from "react-device-detect";
import FullWindowHeightContainer from "../components/common/full-window-height-container/full-window-height-container";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#57CC99" },
    secondary: { main: "#624CAB" },
    success: { main: "#38A3A5" },
    warning: { main: "#FFC857" },
    error: { main: "#DB5461" },
  },
  drawerWidth: 350,
  detailDrawerWidth: 360,
  detailDrawerHeaderHeight: 250,
});

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
    width: "100vw"
  },
}));

function MapScreen(props) {
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
  const [monuments, setMonuments] = useState([]);
  const [center, setCenter] = useState(defaultCity);

  const prevSelectedLanguage = usePrevious(selectedLanguage);
  const prevSelectedConditions = usePrevious(selectedConditions);
  const prevSelectedCities = usePrevious(selectedCities);
  const prevSelectedStatuses = usePrevious(selectedStatuses);

  const [cancelRequest, setCancelRequest] = useState(null);
  const history = useHistory();
  let match = useRouteMatch();

  function executor(e) {
    setCancelRequest({
      cancel: e,
    });
  }

  const update = () => {
    if (cancelRequest) {
      cancelRequest.cancel();
    }

    monumentService
      .getMonumentsByFilter(
        selectedCities.map((c) => c.id),
        selectedStatuses,
        selectedConditions,
        executor
      )
      .then((monuments) => {
        setMonuments(monuments);
      });
  };


  useEffect(() => {
    if (
      prevSelectedLanguage == null ||
      selectedLanguage.code !== prevSelectedLanguage.code
    )
      update();
  }, [selectedLanguage]);

  useEffect(() => {
    //TODO check same
    if (selectedMonument.id !== 0) {
      history.push(`${match.path}monument/${selectedMonument.id}`);
    }
  }, [selectedMonument]);

  useEffect(() => {
    if (
      typeof prevSelectedConditions !== "undefined" &&
      !arraysEqual(prevSelectedConditions, selectedConditions)
    ) {
      update();
    }
  }, [selectedConditions]);

  useEffect(() => {
    if (
      typeof prevSelectedCities !== "undefined" &&
      !arraysEqual(prevSelectedCities, selectedCities)
    ) {
      update();
    }
  }, [selectedCities]);

  useEffect(() => {
    if (
      typeof prevSelectedStatuses !== "undefined" &&
      !arraysEqual(prevSelectedStatuses, selectedStatuses)
    ) {
      update();
    }
  }, [selectedStatuses]);

  useEffect(() => {
    const userCultureIndex = supportedCultures.findIndex(
      (p) => p.code.split("-")[0] === navigator.language.split("-")[0]
    );
    const culture =
      userCultureIndex > -1
        ? supportedCultures[userCultureIndex]
        : supportedCultures[1]; //en-GB
    setSelectedLanguage(culture);
  }, []);

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
  };

  return (
    <AppContext.Provider value={contextValues}>
      <MuiThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={5}>
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
          <MainDrawer className={classes.menuButton} />
          <Switch>
            <Route path={`${match.path}monument/:monumentId`}>
              <DetailDrawer />
            </Route>
          </Switch>
        </SnackbarProvider>
      </MuiThemeProvider>
    </AppContext.Provider>
  );
}

export default MapScreen;
