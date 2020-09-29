import { Button, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { Trans } from "react-i18next";
import MobileMonumentsListDialog from "./mobile-monument-list-dialog";

export default function MobileMonumentContainer({ monuments }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <Grid item xs={12}>
      <Button
        color="secondary"
        // variant="outlined"
        onClick={handleOpen}
        disabled={monuments == null || monuments.length == 0}
      >
        <Trans>List of selected monuments</Trans>
      </Button>
      <MobileMonumentsListDialog
        monuments={monuments}
        open={open}
        onBack={handleClose}
      />
    </Grid>
  );
}
