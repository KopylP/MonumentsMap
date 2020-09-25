import React, { useEffect } from "react";
import withMonumentService from "../../../components/hoc-helpers/with-monument-service";
import withData from "../../../components/hoc-helpers/with-data";
import { supportedRoles } from "../../../config";
import { useFormik } from "formik";
import RolesForm from "./components/roles-form";
import withSimpleAcceptForm from "../hoc-helpers/withSimpleAcceptForm";

const getInitialValues = () => {
  const initialValues = {};
  for (let role of supportedRoles) {
    initialValues[role] = false;
  }
  return initialValues;
};

function EditUserRoles({ data, acceptForm, loading }) {
  const handleSubmit = (values) => {
    const roleNames = [];
    for (let role in values) {
      if (values[role]) {
        roleNames.push(role);
      }
    }
    acceptForm([data.id, { roleNames }]);
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
    <RolesForm
      formik={formik}
      displayName={data.displayName}
      loading={loading}
    />
  );
}

export default withMonumentService(
  withData(withSimpleAcceptForm(EditUserRoles), ["itemId"])
)((monumentService) => ({
  getData: monumentService.getUser,
  acceptFormMethod: monumentService.changeUserRoles,
}));
