import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import MonumentListModal from "./monument-list-modal/monument-list-modal";

/**
 *
 * @param {*} data - monumentId
 */
export default function MonumentListAdminPanel() {

  const [openMonumentsList, setOpenMonumentsList] = useState(false);

  return (
    <React.Fragment>
      <Grid container justify="flex-end" spacing={2}>
        <Button color="primary" onClick={() => setOpenMonumentsList(true)}>Пам'ятки архітектури</Button>
      </Grid>
      <MonumentListModal open={openMonumentsList} setOpen={setOpenMonumentsList}/>
    </React.Fragment>
  );
}
