import React, { memo, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AdminDrawer from "../components/main/admin-drawer";
import AdminAppBar from "../components/main/admin-app-bar";
import { useRouteMatch, Route, Switch } from "react-router-dom";
import ParticipantsResource from "../components/participants/participants-resource";
import AdminContext from "../context/admin-context";
import MonumentService from "../../services/monument-service";
import { serverHost, defaultCulture } from "../../config";
import MonumentsResource from "../components/monuments/monuments-resource";
import GeocoderService from "../../services/geocoder-service";
import UsersResource from "../components/users/users-resource";
import UserRole from "../../models/user-role";
import withData from "../components/hoc-helpers/with-data";
import withAuthService from "../components/hoc-helpers/with-auth-service";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -theme.adminDrawerWidth,
    position: "releative",
    overflow: "auto",
    width: "100%",
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
  const [routes] = useState([
    {
      name: "Користувачі",
      path: "users",
      roles: [UserRole.Admin],
      Page: () => <UsersResource />,
    },
    { separator: true },
    {
      name: "Учасники будівництва",
      path: "participants",
      roles: [UserRole.Editor],
      Page: () => <ParticipantsResource />,
    },
    {
      name: "Пам'ятки архітектури",
      path: "monuments",
      roles: [UserRole.Editor],
      Page: () => <MonumentsResource />,
    },
    { separator: true },
  ]);

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const [title, setTitle] = useState("Admin panel");
  const { path } = useRouteMatch();
  const monumentService = new MonumentService(serverHost, defaultCulture);
  const geocoderService = new GeocoderService(defaultCulture.split("-")[0]);
  const contextValues = { monumentService, geocoderService };
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
          <RightPanel routes={routes} path={path} />
        </main>
      </div>
    </AdminContext.Provider>
  );
}

const RightPanel = memo(({ routes, path }) => {
  return (
    <Switch>
      {routes
        .filter((route) => !route.separator)
        .map((route) => (
          <Route path={`${path}/${route.path}`}>
            <route.Page />
          </Route>
        ))}
      <Route exact path={path}>
        <div>Виберіть опцію</div>
      </Route>
    </Switch>
  );
});

export default memo(withAuthService(withData(AdminPanel))((authService) => ({
  getData: authService.getMe,
})));
