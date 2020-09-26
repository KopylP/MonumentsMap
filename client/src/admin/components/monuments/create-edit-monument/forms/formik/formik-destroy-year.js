import { FormControl, TextField } from "@material-ui/core";
import React from "react";

export default function FormikDestroyYear({ formik }) {
  return (
    <FormControl style={{ width: "100%" }}>
      <TextField
        id="standard-basic"
        label="Рік знищення"
        type="number"
        name="destroyYear"
        value={formik.values.destroyYear}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        error={formik.touched.year && formik.errors.destroyYear}
        helperText={
          formik.touched.destroyYear &&
          formik.errors.destroyYear &&
          formik.errors.destroyYear
        }
      />
    </FormControl>
  );
}
