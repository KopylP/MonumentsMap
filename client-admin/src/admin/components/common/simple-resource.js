import React, { memo } from "react";
import {
  useRouteMatch,
  Route,
  Switch,
  Link,
  useLocation,
} from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import PropTypes from "prop-types";

function SimpleResource({
  ItemList,
  CreateItem = null,
  UpdateItem = null,
  extra = [],
}) {
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();

  return (
    <Grid container spacing={3}>
      <Grid xs={12}>
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
      </Grid>
      <Grid xs={12}>
        <Switch>
          {extra.map(({ route, Component }, i) => (
            <Route exact path={`${path}/${route}`} key={i}>
              <Component />
            </Route>
          ))}
          {CreateItem ? (
            <Route path={`${path}/create`}>
              <CreateItem />
            </Route>
          ) : null}
          {UpdateItem ? (
            <Route path={`${path}/:itemId`}>
              <UpdateItem />
            </Route>
          ) : null}
          <Route exact path={path}>
            <ItemList />
          </Route>
        </Switch>
      </Grid>
    </Grid>
  );
}

SimpleResource.propTypes = {
  extra: PropTypes.arrayOf({
    route: PropTypes.string.isRequired,
    Component: PropTypes.node.isRequired,
  }),
  ItemList: PropTypes.node.isRequired,
  CreateItem: PropTypes.node,
  UpdateItem: PropTypes.node,
};

export default memo(SimpleResource);
