import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";

export default function SimpleSubmitForm({ disableSubmit = false }) {
  const history = useHistory();
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
      <Button
        variant="contained"
        color="secondary"
        type="submit"
        disabled={disableSubmit}
        style={{ marginLeft: 15 }}
      >
        Прийняти
      </Button>
    </Grid>
  );
}