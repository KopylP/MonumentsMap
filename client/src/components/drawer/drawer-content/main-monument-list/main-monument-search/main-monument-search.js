import React from "react";
import { Grid, TextField, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";

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

export default function MainMonumentSearch({ value, onChange }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          justify="space-between"
        >
          <Grid item xs={12}>
            <TextField
              className={classes.width100per}
              id="input-with-icon-grid"
              label={t("Search by name")}
              value={value}
              onChange={onChange}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
