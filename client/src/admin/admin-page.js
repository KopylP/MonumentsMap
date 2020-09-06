import React, { useState } from "react";
import withData from "../components/hoc-helpers/with-data";
import withAuthService from "../components/hoc-helpers/with-auth-service";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AdminDrawer from "./components/main/admin-drawer";
import AdminAppBar from "./components/main/admin-app-bar";
import { useRouteMatch, Route, Switch } from "react-router-dom";
import ParticipantsResource from "./components/participants/participants-resource";
import AdminContext from "./context/admin-context";
import MonumentService from "../services/monument-service";
import { serverHost } from "../config";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -theme.adminDrawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

function AdminPanel({ data }) {
  const routes = [
    {
      name: "Учасники будівництва",
      path: "participants",
      roles: ["Editor"],
      Page: () => <ParticipantsResource />,
    },
    { separator: true },
  ];

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const [title, setTitle] = useState("Admin panel");
  const { path } = useRouteMatch();
  const monumentService = new MonumentService(serverHost, "uk-UA");
  const contextValues = {monumentService};
  return (
    <AdminContext.Provider value={contextValues}>
      <div className={classes.root}>
        <CssBaseline />
        <AdminAppBar
          drawerOpen={open}
          onMenuClick={handleDrawerOpen}
          title={title}
        />
        <AdminDrawer
          open={open}
          setOpen={setOpen}
          routes={routes}
          roles={data.roles.map((p) => p.name)}
        />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <Switch>
            <Route exact path={`${path}`}>
              <div>Виберіть опцію</div>
            </Route>
            {routes
              .filter((route) => !route.separator)
              .map((route) => (
                <Route path={`${path}/${route.path}`}>
                  <route.Page />
                </Route>
              ))}
          </Switch>
        </main>
      </div>
    </AdminContext.Provider>
  );
}

export default withAuthService(withData(AdminPanel))((authService) => ({
  getData: authService.getMe,
}));
