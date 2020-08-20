import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import MapPage from "./page/map-page";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import LoginPage from "./page/login-page";

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

function App(props) {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <MuiThemeProvider theme={theme}>
            <LoginPage />
          </MuiThemeProvider>
        </Route>
        <Route path="/">
          <MuiThemeProvider theme={theme}>
            <MapPage />
          </MuiThemeProvider>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
