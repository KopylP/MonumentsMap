import React, { useContext, useEffect } from "react";
import { supportedCultures } from "../../../config";
import { useHistory } from "react-router-dom";
import withData from "../../../components/hoc-helpers/with-data";
import withMonumentService from "../../../components/hoc-helpers/with-monument-service";
import { useSnackbar } from "notistack";
import AdminContext from "../../context/admin-context";
import errorNetworkSnackbar from "../../../components/helpers/error-network-snackbar";
import { mergeTwoArraysByKey } from "../../../components/helpers/array-helpers";
import CreateEditParticipantForm from "./create-edit-participant-form";
import * as Yup from "yup";

export default function CreateEditParticipant({ data }) {
  const {
    monumentService: { editParticipant, createParticipant },
  } = useContext(AdminContext);

  const { enqueueSnackbar } = useSnackbar();

  const initialValues = {
    defaultName: data ? data.defaultName : "",
    participantRole: data ? data.participantRole || "" : "",
  };

  if (data) {
    const name = mergeTwoArraysByKey(supportedCultures, data.name, "code", "culture", "code");
    name.forEach((cultureValuePair) => {
      initialValues[cultureValuePair.code] = cultureValuePair.value;
    });
  } else {
    supportedCultures.forEach((culture) => {
      initialValues[culture.code] = "";
    });
  }

  const validationSchemafileds = {
    defaultName: Yup.string().required("Цу поле є обов'язковим"),
    participantRole: Yup.number(),
  };

  const submitForm = (values) => {
    const participant = {};
    participant.participantRole = values.participantRole;
    participant.defaultName = values.defaultName;
    participant.name = supportedCultures.map((supportCulture) => ({
      culture: supportCulture.code,
      value: values[supportCulture.code],
    }));
    let requestMethod = createParticipant;
    if (data) {
      participant.id = data.id;
      requestMethod = editParticipant;
    }
    requestMethod(participant)
      .then(() => history.goBack())
      .catch((e) =>
        errorNetworkSnackbar(enqueueSnackbar, e.response && e.response.status)
      );
  };

  const history = useHistory();

  return (
    <CreateEditParticipantForm
      submitForm={submitForm}
      initialValues={initialValues}
      validationSchemaFileds={validationSchemafileds}
      edit={data ? true: false}
    />
  );
}

export const EditParticipant = withMonumentService(
  withData(CreateEditParticipant, ["itemId"])
)((monumentService) => ({
  getData: monumentService.getEditableParticipant,
}));
