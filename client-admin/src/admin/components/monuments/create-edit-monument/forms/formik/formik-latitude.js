import { FormControl, TextField } from "@material-ui/core";
import React from "react";

export default function FormikLatitude({ formik }) {
  return (
    <FormControl style={{ width: "100%" }}>
      <TextField
        required
        id="standard-basic"
        name="latitude"
        label="Широта"
        type="number"
        value={formik.values.latitude}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        error={formik.touched.latitude && formik.errors.latitude}
        helperText={
          formik.touched.latitude &&
          formik.errors.latitude &&
          formik.errors.latitude
        }
      />
    </FormControl>
  );
}
