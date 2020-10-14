import React from "react";
import PeriodFormControl from "../period-form-control";

export default function FormikDestroyPeriod({ formik, disabled }) {
  return (
    <PeriodFormControl
      label="Період знищення"
      name="destroyPeriod"
      value={formik.values.destroyPeriod}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      disabled={disabled}
      error={formik.touched.destroyPeriod && formik.errors.destroyPeriod}
      helperText={
        formik.touched.destroyPeriod &&
        formik.errors.destroyPeriod &&
        formik.errors.destroyPeriod
      }
    />
  );
}
