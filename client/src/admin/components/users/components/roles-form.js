import { Grid } from "@material-ui/core";
import React from "react";
import SimpleSubmitForm from "../../common/simple-submit-form";
import SimpleTitle from "../../common/ui/simple-title";
import RolesFormList from "./roles-form-list";

export default function RolesForm({ formik, displayName, loading }) {
  return (
    <form style={{ padding: 20 }} onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <SimpleTitle text="Права користувача" />
        <Grid xs={12} item>
          <RolesFormList
            displayName={displayName}
            values={formik.values}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <SimpleSubmitForm loading={loading} />
      </Grid>
    </form>
  );
}
