import React from "react";
import CityFormControl from "../city-form-control";

export default function FormikCity({ formik, onCitiesLoad, getCitiesMethod }) {
  return (
    <CityFormControl
      onBlur={formik.onBlur}
      onAutocompliteChange={(_, newValue) =>
        formik.setFieldValue("city", newValue)
      }
      onTextFieldChange={formik.handleChange}
      autocompliteName="city"
      value={formik.values.city}
      textFieldName="cityName"
      onCitiesLoad={onCitiesLoad}
      getCitiesMethod={getCitiesMethod}
      helperText={
        formik.touched.cityName && formik.errors.city && formik.errors.city
      }
      error={formik.touched.cityName && formik.errors.city}
      label="Місто"
    />
  );
}
