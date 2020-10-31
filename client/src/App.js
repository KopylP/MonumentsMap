import React, { memo } from "react";
import MonumentService from "./services/monument-service";
import GeocoderService from "./services/geocoder-service";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import withStore from "./store/with-store";
import AppContext from "./context/app-context";
import { serverHost } from "./config";
import AppRouter from "./components/app-router/app-router";


const theme = createMuiTheme({
  palette: {
    primary: { main: "#57CC99" },
    secondary: { main: "#624CAB" },
    success: { main: "#38A3A5" },
    warning: { main: "#FFC857" },
    error: { main: "#DB5461" },
  },
  drawerWidth: 360,
  detailDrawerWidth: 360,
  detailDrawerHeaderHeight: 250,
  adminDrawerWidth: 240,
});

function App({ store }) {
  const { selectedLanguage } = store;
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
      <I18nextProvider i18n={i18n}>
        <MuiThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={5}>
            <AppRouter />
          </SnackbarProvider>
        </MuiThemeProvider>
      </I18nextProvider>
    </AppContext.Provider>
  );
}

export default withStore(App);
