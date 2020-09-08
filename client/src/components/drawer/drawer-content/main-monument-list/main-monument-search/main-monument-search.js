import React from "react";
import { Grid, TextField, useTheme, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  width100per: {
    width: "100%",
  },
  root: {
    marginTop: theme.spacing(2),
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

export default function MainMonumentSearch() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs="12">
        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          justify="space-between"
        >
          <Grid item xs="1">
            <SearchIcon />
          </Grid>
          <Grid item xs="11">
            <TextField
              className={classes.width100per}
              id="input-with-icon-grid"
              label="Пошук за адресою"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
