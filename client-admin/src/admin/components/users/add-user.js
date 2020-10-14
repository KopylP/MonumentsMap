import React from "react";
import { Grid, TextField } from "@material-ui/core";
import SimpleSubmitForm from "../common/simple-submit-form";
import * as Yup from "yup";
import { useFormik } from "formik";
import SimpleTitle from "../common/ui/simple-title";
import withSimpleAcceptForm from "../hoc-helpers/withSimpleAcceptForm";
import withMonumentService from "../hoc-helpers/with-monument-service";

function AddUser({ acceptForm, loading }) {

  const initialValues = {
    email: "",
  };

  const validationSchemafileds = {
    email: Yup.string()
      .email("Введіть коректну пошту")
      .required("Цe поле є обов'язковим"),
  };

  const submitForm = (values) => {
    acceptForm([values.email]);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchemafileds),
    onSubmit: submitForm,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3} alignItems="flex-end">
        <SimpleTitle text="Запросити нового користувача"/>
        <Grid item xs={12}>
          <TextField
            style={{ width: "100%" }}
            label="Email"
            name="email"
            required
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.email && formik.errors.email}
            helperText={
              formik.touched.email && formik.errors.email && formik.errors.email
            }
          />
        </Grid>
      </Grid>
      <SimpleSubmitForm loading={loading} />
    </form>
  );
}

export default withMonumentService(withSimpleAcceptForm(AddUser))(p => ({
  acceptFormMethod: p.inviteUser
}));