import { FormControl, TextField } from "@material-ui/core";
import React from "react";

export default function FormikYear({ formik }) {
  return (
    <FormControl style={{ width: "100%" }}>
      <TextField
        id="standard-basic"
        label="Рік побудови"
        type="number"
        name="year"
        required
        value={formik.values.year}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        error={formik.touched.year && formik.errors.year}
        helperText={
          formik.touched.year && formik.errors.year && formik.errors.year
        }
      />
    </FormControl>
  );
}
