import React from "react";
import SelectTypeofMonumentFormControl from "../select-typeof-monument-form-control";

export default function FormikCondition({ formik, getTypesMethod, onChangeCondition, onLoadConditions }) {
  return (
    <SelectTypeofMonumentFormControl
      label="Стан пам'ятки"
      value={formik.values.conditionId}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      error={formik.touched.conditionId && formik.errors.conditionId}
      name="conditionId"
      getTypesMethod={getTypesMethod}
      onChangeType={onChangeCondition}
      onLoadTypes={onLoadConditions}
      helperText={
        formik.touched.conditionId &&
        formik.errors.conditionId &&
        formik.errors.conditionId
      }
    />
  );
}
