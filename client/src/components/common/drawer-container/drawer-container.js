import React, { useState } from "react";
import { Grid } from "@material-ui/core";

export default function DrawerContainer(props) {
  const { onClose } = props;
  return (
    <Grid
      container
      xs="12"
      direction="column"
      justify="flex-start"
      alignItems="stretch"
    >
      {props.children}
    </Grid>
  );
}
