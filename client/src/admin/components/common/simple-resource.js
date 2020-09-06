import React from "react";
import {
  useRouteMatch,
  Route,
  Switch,
  Link,
  useLocation,
} from "react-router-dom";
import { Grid, Button } from "@material-ui/core";

export default function SimpleResource({ ItemList, CreateItem, UpdateItem }) {
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();

  return (
    <Grid container spacing={3}>
      {path === pathname ? (
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="baseline"
        >
          <Link to={`${url}/create`}>
            <Button color="secondary" variant="contained">
              Створити
            </Button>
          </Link>
        </Grid>
      ) : null}

      <Switch>
        <Route exact path={path}>
          <ItemList />
        </Route>
        <Route path={`${path}/create`}>
          <CreateItem />
        </Route>
        <Route path={`${path}/:itemId`}>
          <UpdateItem />
        </Route>
      </Switch>
    </Grid>
  );
}
