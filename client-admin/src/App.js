import React from "react";
import { MemoryRouter, BrowserRouter, Switch, Route } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { isIOS } from "react-device-detect";
import LoginPage from "./admin/pages/login-page";
import RegistrationPage from "./admin/pages/registration-page";
import AdminPage from "./admin/pages/admin-page";
import { SnackbarProvider } from "notistack";

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

const oldPathName = window.location.pathname;
const memoryHistoryParams = {
  initialEntries: [{ pathname: oldPathName }],
  initialIndex: 0,
};
const Router = isIOS ? MemoryRouter : BrowserRouter;
const routerProps = isIOS ? memoryHistoryParams : {};

if (isIOS && oldPathName !== "/" && window.history.pushState) {
  window.history.pushState(null, null, "/");
}

function App() {
  return (
    <Router {...routerProps}>
      <SnackbarProvider maxSnack={5}>
        <MuiThemeProvider theme={theme}>
          <div style={{ width: "100%", height: "100%" }}>
            <Switch>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/invitation">
                <RegistrationPage />
              </Route>
              <Route path="/">
                <AdminPage />
              </Route>
            </Switch>
          </div>
        </MuiThemeProvider>
      </SnackbarProvider>
    </Router>
  );
}

export default App;
