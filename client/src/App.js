import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import MapScreen from "./screens/MapScreen";

function App(props) {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <MapScreen />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
