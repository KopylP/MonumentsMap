import { FormControl, TextField } from "@material-ui/core";
import React from "react";

export default function FormikLongitude({ formik }) {
  return (
    <FormControl style={{ width: "100%" }}>
      <TextField
        required
        id="standard-basic"
        name="longitude"
        label="Довгота"
        type="number"
        value={formik.values.longitude}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        error={formik.touched.longitude && formik.errors.longitude}
        helperText={
          formik.touched.longitude &&
          formik.errors.longitude &&
          formik.errors.longitude
        }
      />
    </FormControl>
  );
}
