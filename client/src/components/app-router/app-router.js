import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
const MapPage = React.lazy(() => import("../../pages/map-page"));

export default function AppRouter() {
  return (
    <BrowserRouter basename="/map">
      <Suspense fallback={<div></div>}>
        <Switch>
          <Route path="/">
            <MapPage />
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}
