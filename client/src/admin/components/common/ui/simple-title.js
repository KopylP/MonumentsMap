import { Grid } from "@material-ui/core";
import React from "react";

export default function SimpleTitle({ text }) {
  return (
    <Grid item xs={12}>
      <h2>{text}</h2>
    </Grid>
  );
}
