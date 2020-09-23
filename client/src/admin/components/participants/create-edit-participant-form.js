import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import { supportedCultures } from "../../../config";
import SimpleSubmitForm from "../common/simple-submit-form";
import {
  Grid,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
} from "@material-ui/core";
import ParticipantRole from "../../../models/participant-role";
import * as Yup from "yup";

export default function CreateEditParticipantForm({
  submitForm,
  initialValues,
  validationSchemaFileds,
  edit = false,
  loading
}) {
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchemaFileds),
    onSubmit: submitForm,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h2>
            {edit ? "Редагувати" : "Створити нового"} учасника будівництва
          </h2>
        </Grid>
        <Grid item xs={6}>
          <FormControl style={{ width: "100%" }}>
            <TextField
              id="standard-basic"
              label="Стандартне ім'я"
              name="defaultName"
              required
              value={formik.values.defaultName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.defaultName && formik.errors.defaultName}
              helperText={
                formik.touched.defaultName &&
                formik.errors.defaultName &&
                formik.errors.defaultName
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl style={{ width: "100%" }}>
            <InputLabel>Роль учасника будівництва</InputLabel>
            <Select
              labelId="participantRole"
              name="participantRole"
              value={formik.values.participantRole}
              error={
                formik.touched.participantRole && formik.errors.participantRole
              }
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            >
              <MenuItem value={ParticipantRole.Architect}>Архітектор</MenuItem>
              <MenuItem value={ParticipantRole.Sculptor}>Скульптор</MenuItem>
              <MenuItem value={ParticipantRole.Сontractor}>Підрядник</MenuItem>
            </Select>
            <FormHelperText>
              {formik.touched.participantRole &&
                formik.errors.participantRole &&
                formik.errors.participantRole}
            </FormHelperText>
          </FormControl>
        </Grid>
        {supportedCultures.map((culture, i) => (
          <Grid item xs={12} key={i}>
            <TextField
              style={{ width: "100%", margin: 0 }}
              name={culture.code}
              label={`Ім'я (${culture.name})`}
              margin="normal"
              value={formik.values[culture.code]}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </Grid>
        ))}
      </Grid>
      <SimpleSubmitForm
        disableSubmit={!Object.keys(formik.touched).length > 0}
        loading={loading}
      />
    </form>
  );
}
