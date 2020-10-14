import React from "react";
import SelectTypeofMonumentFormControl from "../select-typeof-monument-form-control";

export default function FormikStatus({ formik, getTypesMethod }) {
  return (
    <SelectTypeofMonumentFormControl
      label="Статус пам'ятки"
      value={formik.values.statusId}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      error={formik.touched.statusId && formik.errors.statusId}
      name="statusId"
      getTypesMethod={getTypesMethod}
      helperText={
        formik.touched.statusId &&
        formik.errors.statusId &&
        formik.errors.statusId
      }
    />
  );
}
