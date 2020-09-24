import React, { useContext, useEffect, useState } from "react";
import withMonumentService from "../../../components/hoc-helpers/with-monument-service";
import withData from "../../../components/hoc-helpers/with-data";
import { supportedRoles } from "../../../config";
import { useFormik } from "formik";
import AdminContext from "../../context/admin-context";
import useCancelablePromise from "@rodw95/use-cancelable-promise";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import errorNetworkSnackbar from "../../../components/helpers/error-network-snackbar";
import RolesForm from "./components/roles-form";

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

  useEffect(() => {
    for (let userRole of data.roles) {
      formik.setFieldValue(userRole.name, true);
    }
  }, []);

  const formik = useFormik({
    initialValues: getInitialValues(),
    onSubmit: handleSubmit,
  });

  return (
    <RolesForm formik={formik} displayName={data.displayName} loading={loading}/>
  );
}

export default withMonumentService(withData(EditUserRoles, ["itemId"]))(
  (monumentService) => ({
    getData: monumentService.getUser,
  })
);
