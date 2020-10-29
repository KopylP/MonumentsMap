import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MapPage from "./pages/map-page";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

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
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename="/map">
        <Switch>
          <Route path="/">
            <SnackbarProvider maxSnack={5}>
              <MuiThemeProvider theme={theme}>
                <MapPage />
              </MuiThemeProvider>
            </SnackbarProvider>
          </Route>
        </Switch>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
