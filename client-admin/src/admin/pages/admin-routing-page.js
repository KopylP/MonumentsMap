import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AdminPage from "./admin-page";
import LoginPage from "./login-page";
import RegistrationPage from "./registration-page";

export default function AdminRoutingPage() {
  let match = useRouteMatch();
  return (
    // <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
      <Switch>
        <Route path={`${match.path}/login`}>
          <LoginPage />
        </Route>
        <Route path={`${match.path}/invitation`}>
          <RegistrationPage />
        </Route>
        <Route path={match.path}>
          <AdminPage />
        </Route>
      </Switch>
    // </div>
  );
}
