import React, { useEffect } from "react";
import { makeStyles, Paper, Grid, TextField, Button } from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { useFormik } from "formik";
import * as Yup from "yup";
import withAuthService from "../../components/hoc-helpers/with-auth-service";
import LocalStorageService from "../../services/local-storage-service";
import { useSnackbar } from "notistack";
import errorNetworkSnackbar from "../../components/helpers/error-network-snackbar";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100vh",
    justifyContent: "center",
    backgroundColor: "#dfdfdf",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(3),
    width: 250,
  },
  textField: {
    width: "100%",
  },
}));

function LoginPage({ auth }) {

  const { enqueueSnackbar } = useSnackbar();

  const history = useHistory();

  const localStorageService = LocalStorageService.getService();

  useEffect(() => {
    localStorageService.clearToken();
  }, []);

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: Yup.object({
      login: Yup.string().required("Це поле є обов'язковим"),
      password: Yup.string().required("Це поле є обов'язковим"),
    }),
    onSubmit: (values) => {
      auth(values.login, values.password)
        .then((token) => {
          console.log("authorize");
          localStorageService.setToken(token);
          history.push("/admin");
        })
        .catch((e) => {
          errorNetworkSnackbar(enqueueSnackbar, e.response, true);
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
              <LockOpenIcon fontSize="large" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                label="Login"
                name="login"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.login && formik.errors.login}
                helperText={
                  formik.touched.login &&
                  formik.errors.login &&
                  formik.errors.login
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                label="Password"
                type="password"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.password && formik.errors.password}
                helperText={
                  formik.touched.password &&
                  formik.errors.password &&
                  formik.errors.password
                }
              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button type="submit">SIGN IN</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}

export default withAuthService(LoginPage)((p) => ({
  auth: p.auth,
}));
