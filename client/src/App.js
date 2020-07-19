import React, { useState, useEffect } from "react";

import {
  createMuiTheme,
  MuiThemeProvider,
  makeStyles,
} from "@material-ui/core";
import MainDrawer from "./components/drawer/main-drawer";
import AppContext from "./context/app-context";
import MenuButton from "./components/common/menu-button/menu-button";
import Map from "./components/map/map";
import { supportedCultures, serverHost } from "./config";
import MonumentService from "./services/monument-service";
import DetailDrawer from "./components/detail-drawer/detail-drawer";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#57CC99" },
    secondary: { main: "#624CAB" },
    success: { main: "#38A3A5" },
    warning: { main: "#FFC857" },
    error: { main: "#DB5461" },
  },
  drawerWidth: 350,
  detailDrawerWidth: 360
});

const useStyles = makeStyles((theme) => ({
  menuButton: {
    position: "fixed",
    left: 10,
    top: 10,
  },
  app: {
    display: "flex",
  },
  mapContainer: {
    height: "100vh",
    width: "100%",
    position: "relative",
  },
}));

function App(props) {
  const classes = useStyles(props);
  const [mainDrawerOpen, setMainDrawerOpen] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(supportedCultures[0]);
  const [selectedMonumentId, setSelectedMonumentId] = useState(0);

  useEffect(() => {
    const userCultureIndex = supportedCultures.findIndex(p => p.code.split('-')[0] === navigator.language.split('-')[0]);
    const culture = userCultureIndex > -1 ? supportedCultures[userCultureIndex] : supportedCultures[1];//en-GB
    setSelectedLanguage(culture);
  }, []);

  const monumentService = new MonumentService(serverHost, selectedLanguage.code);

  const contextValues = {
    mainDrawerOpen,
    setMainDrawerOpen,
    selectedLanguage, 
    setSelectedLanguage,
    monumentService,
    selectedMonumentId,
    setSelectedMonumentId
  };

  //For tests
  useEffect(() => {
    setTimeout(() => {
      setSelectedMonumentId(2);
    }, 1000);
  }, []);
  //!For tests

  return (
    <AppContext.Provider value={contextValues}>
      <MuiThemeProvider theme={theme}>
        <div className={classes.app}>
          <div className={classes.mapContainer}>
            <Map />
            <MenuButton
              className={classes.menuButton}
              onClick={() => setMainDrawerOpen(true)}
            />
          </div>
        </div>
        <MainDrawer className={classes.menuButton} />
        <DetailDrawer />
      </MuiThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
