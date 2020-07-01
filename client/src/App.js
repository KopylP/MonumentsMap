import React, { useState } from "react";

import {
  createMuiTheme,
  MuiThemeProvider,
  makeStyles,
} from "@material-ui/core";
import MainDrawer from "./components/drawer/main-drawer";
import AppContext from "./context/app-context";
import MenuButton from "./components/common/menu-button/menu-button";
import Map from "./components/map/map";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#57CC99" },
    secondary: { main: "#624CAB" },
    success: { main: "#38A3A5" },
    warning: { main: "#FFC857" },
    error: { main: "#DB5461" },
  },
  drawerWidth: 350,
});

const useStyles = makeStyles((theme) => ({
  menuButton: {
    position: "absolute",
    left: 10,
    top: 10,
  },
  app: {
    display: "flex"
  },
  mapContainer: {
    height: "100vh", width: "100%", position: "relative"
  }
}));


function App(props) {
  const classes = useStyles(props);
  const [mainDrawerOpen, setMainDrawerOpen] = useState(true);

  const contextValues = {
    mainDrawerOpen,
    setMainDrawerOpen,
  };

  return (
    <AppContext.Provider value={contextValues}>
      <MuiThemeProvider theme={theme}>
        <div className={classes.app}>
          <div className={classes.mapContainer}>
            <Map />
            <MenuButton className={classes.menuButton}  onClick={() => setMainDrawerOpen(true)}/>
          </div>
        </div>
        <MainDrawer className={classes.menuButton}/>
      </MuiThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
