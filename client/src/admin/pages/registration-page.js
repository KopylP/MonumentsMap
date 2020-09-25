import {
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import React from "react";
import withQueryParameters from "../../components/hoc-helpers/with-query-parameters";
import * as Yup from "yup";
import { useFormik } from "formik";
import PersonAdd from "@material-ui/icons/PersonAdd";
import withMonumentService from "../../components/hoc-helpers/with-monument-service";
import useCancelablePromise from "@rodw95/use-cancelable-promise";
import { useHistory } from "react-router-dom";
import errorNetworkSnackbar from "../../components/helpers/error-network-snackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "White",
    width: "100%",
    height: "100vh",
    justifyContent: "center",
    backgroundColor: "#dfdfdf",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(3),
    width: 300,
  },
  textField: {
    width: "100%",
  },
}));

function equalTo(ref, msg) {
  return Yup.mixed().test({
    name: "equalTo",
    exclusive: false,
    message: msg || "${path} must be the same as ${reference}",
    params: {
      reference: ref.path,
    },
    test: function (value) {
      return value === this.resolve(ref);
    },
  });
}
Yup.addMethod(Yup.string, "equalTo", equalTo);

function RegistrationPage({ code, email, registerUser }) {
  const { enqueueSnackbar } = useSnackbar();
  const makeCancelable = useCancelablePromise();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      displayName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      displayName: Yup.string()
        .required("Це поле є обов'язковим"),
      password: Yup.string()
        .min(6, "Пароль занадто короткий")
        .required("Це поле є обов'язковим"),
      confirmPassword: Yup.string()
        .required("Це поле є обов'язковим")
        .equalTo(Yup.ref("password"), "Паролі мають співпадати"),
    }),
    onSubmit: (values) => {
      const registerModel = {
        displayName: values.displayName,
        email: email,
        password: values.password,
        inviteCode: code,
      };
      makeCancelable(registerUser(registerModel))
        .then(() => {
            enqueueSnackbar("Вас успішно зареєстровано!");
            history.push("login");
        })
        .catch(e => {
            errorNetworkSnackbar(enqueueSnackbar, e);
        });
    },
  });

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <PersonAdd fontSize="large" />
            </Grid>
            <Grid item xs={12}>
              <Typography align="center" color="secondary">
                {email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                label="Твоє ім'я"
                name="displayName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={
                  formik.touched.displayName && formik.errors.displayName
                    ? true
                    : false
                }
                helperText={
                  formik.touched.displayName &&
                  formik.errors.displayName &&
                  formik.errors.displayName
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                label="Пароль"
                type="password"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && formik.errors.password
                    ? true
                    : false
                }
                helperText={
                  formik.touched.password &&
                  formik.errors.password &&
                  formik.errors.password
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                label="Повторити пароль"
                type="password"
                name="confirmPassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? true
                    : false
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button type="submit">Створити аккаунт</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}

export default withQueryParameters(
  "code",
  "email"
)(
  withMonumentService(RegistrationPage)((p) => ({
    registerUser: p.registerUser,
  }))
);
