import React, { useState } from "react";
import MonumentService from "./services/monument-service";
import GeocoderService from "./services/geocoder-service";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18nFile from "./i18n";
import AppContext from "./context/app-context";
import { defaultClientCulture, serverHost, supportedCultures } from "./config";
import AppRouter from "./components/app-router/app-router";
import { Provider } from "react-redux";
import store from "./store";
import { defineClientCulture } from "./components/helpers/lang";

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

function App() {
  const { i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState(
    defineClientCulture(supportedCultures, defaultClientCulture)
  );

  const handleLanguageSelected = (language) => {
    if (language) {
      setSelectedLanguage(language);
      i18n.changeLanguage(language.code.split("-")[0]);
    }
  };

  const monumentService = new MonumentService(
    serverHost,
    selectedLanguage.code
  );

  const geocoderService = new GeocoderService(
    selectedLanguage.code.split("-")[0]
  );

  const contextValues = {
    monumentService,
    geocoderService,
    selectedLanguage,
    handleLanguageSelected,
  };

  return (
    <AppContext.Provider value={contextValues}>
      <Provider store={store}>
        <I18nextProvider i18n={i18nFile}>
          <MuiThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={5}>
              <AppRouter />
            </SnackbarProvider>
          </MuiThemeProvider>
        </I18nextProvider>
      </Provider>
    </AppContext.Provider>
  );
}

export default React.memo(App);
