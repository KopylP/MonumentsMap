import { FormControl, TextField } from "@material-ui/core";
import React from "react";

export default function FormikProtectionNumber({ formik }) {
  return (
    <FormControl style={{ width: "100%" }}>
      <TextField
        id="standard-basic"
        name="protectionNumber"
        label="Захисний номер"
        value={formik.values.protectionNumber}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        error={
          formik.touched.protectionNumber && formik.errors.protectionNumber
        }
        helperText={
          formik.touched.protectionNumber &&
          formik.errors.protectionNumber &&
          formik.errors.protectionNumber
        }
      />
    </FormControl>
  );
}
