import React from "react";
import PeriodFormControl from "../period-form-control";

export default function FormikPeriod({ formik }) {
  return (
    <PeriodFormControl
      label="Період"
      name="period"
      required
      value={formik.values.period}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      error={formik.touched.period && formik.errors.period}
      helperText={
        formik.touched.period && formik.errors.period && formik.errors.period
      }
    />
  );
}
