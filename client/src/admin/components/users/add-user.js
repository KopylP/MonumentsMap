import React, { useContext, useState } from "react";
import AdminContext from "../../context/admin-context";
import { useSnackbar } from "notistack";
import { Grid, TextField } from "@material-ui/core";
import SimpleSubmitForm from "../common/simple-submit-form";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import useCancelablePromise from "@rodw95/use-cancelable-promise";
import errorNetworkSnackbar from "../../../components/helpers/error-network-snackbar";

export default function AddUser() {
  const {
    monumentService: { inviteUser },
  } = useContext(AdminContext);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const makeCancelable = useCancelablePromise();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
  };

  const validationSchemafileds = {
    email: Yup.string()
      .email("Введіть коректну пошту")
      .required("Цe поле є обов'язковим"),
  };

  const submitForm = (values) => {
    setLoading(true);
    makeCancelable(inviteUser(values.email))
      .then(() => {
        enqueueSnackbar("Користувача запрошено до проєкту", {
          variant: "success",
        });
        setLoading(false);
        history.goBack();
      })
      .catch((e) => {
        errorNetworkSnackbar(enqueueSnackbar, e.response && e.response.status);
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchemafileds),
    onSubmit: submitForm,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3} alignItems="flex-end">
        <Grid item xs={12}>
          <h2>Запросити нового користувача</h2>
        </Grid>
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
