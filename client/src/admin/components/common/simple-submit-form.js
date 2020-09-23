import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, Button, makeStyles, CircularProgress } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
    marginLeft: 15,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function SimpleSubmitForm({ disableSubmit = false, loading = false }) {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="flex-end"
      alignItems="center"
      style={{ paddingTop: 15 }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.goBack()}
      >
        Назад
      </Button>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          disabled={loading || disableSubmit}
        >
          Прийняти
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </Grid>
  );
}
