import { Checkbox, FormControlLabel } from "@material-ui/core";
import React from "react";

export default function FormikEasterEgg({ formik }) {
  return (
    <FormControlLabel
      style={{
          float: "right",
      }}
      control={
        <Checkbox
          checked={formik.values.isEasterEgg}
          onBlur={formik.handleBlur}
          onChange={e => {
              formik.setFieldValue("isEasterEgg", e.target.checked);
          }}
        />
      }
      label="Пасхалка"
    />
  );
}
