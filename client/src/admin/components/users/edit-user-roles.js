import React, { useContext, useEffect, useState } from "react";
import {
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import withMonumentService from "../../../components/hoc-helpers/with-monument-service";
import withData from "../../../components/hoc-helpers/with-data";
import { supportedRoles } from "../../../config";
import { useFormik } from "formik";
import SimpleSubmitForm from "../common/simple-submit-form";
import AdminContext from "../../context/admin-context";
import useCancelablePromise from "@rodw95/use-cancelable-promise";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import errorNetworkSnackbar from "../../../components/helpers/error-network-snackbar";

const getInitialValues = () => {
  const initialValues = {};
  for (let role of supportedRoles) {
    initialValues[role] = false;
  }
  return initialValues;
};

function EditUserRoles({ data }) {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const makeCancelable = useCancelablePromise();
  const { enqueueSnackbar } = useSnackbar();
  const {
    monumentService: { changeUserRoles },
  } = useContext(AdminContext);

  const handleSubmit = (values) => {
    setLoading(true);
    const roleNames = [];
    for (let role in values) {
      if (values[role]) {
        roleNames.push(role);
      }
    }
    makeCancelable(changeUserRoles(data.id, { roleNames }))
      .then((e) => {
        enqueueSnackbar("Ролі успішно змінено", { variant: "success" });
        history.goBack();
      })
      .catch((e) => {
        errorNetworkSnackbar(enqueueSnackbar, e.response && e.response.status);
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: getInitialValues(),
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    for (let userRole of data.roles) {
      formik.setFieldValue(userRole.name, true);
    }
  }, []);

  return (
    <form style={{ padding: 20 }} onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <h2>Права користувача</h2>
        </Grid>
        <Grid xs={12} item>
          <FormControl component="fieldset">
            <FormLabel component="legend">{data.displayName}</FormLabel>
            <FormGroup>
              {supportedRoles.map((role) => (
                <FormControlLabel
                  key={role}
                  control={
                    <Checkbox
                      checked={formik.values[role]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name={role}
                    />
                  }
                  label={role}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Grid>
        <SimpleSubmitForm loading={loading}/>
      </Grid>
    </form>
  );
}

export default withMonumentService(withData(EditUserRoles, ["itemId"]))(
  (monumentService) => ({
    getData: monumentService.getUser,
  })
);
