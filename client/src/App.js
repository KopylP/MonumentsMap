import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import MapPage from "./pages/map-page";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
// import AdminRoutingPage from "./admin/pages/admin-routing-page";

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

function App(props) {
  return (
    <Router>
      <Switch>
      {/* <Route path="/admin">
          <SnackbarProvider maxSnack={5}>
            <MuiThemeProvider theme={theme}>
              <AdminRoutingPage />
            </MuiThemeProvider>
          </SnackbarProvider>
        </Route> */}
        <Route path="/">
          <SnackbarProvider maxSnack={5}>
            <MuiThemeProvider theme={theme}>
              <MapPage />
            </MuiThemeProvider>
          </SnackbarProvider>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
