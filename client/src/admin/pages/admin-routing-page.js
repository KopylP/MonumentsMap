import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AdminPage from "./admin-page";
import LoginPage from "./login-page";

export default function AdminRoutingPage() {
  let match = useRouteMatch();
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Switch>
        <Route path={`${match.path}/login`}>
          <LoginPage />
        </Route>
        <Route path={match.path}>
          <AdminPage />
        </Route>
      </Switch>
    </div>
  );
}
