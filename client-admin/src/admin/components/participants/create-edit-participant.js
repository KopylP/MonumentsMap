import React from "react";
import { supportedCultures } from "../../../config";
import CreateEditParticipantForm from "./create-edit-participant-form";
import * as Yup from "yup";
import withSimpleAcceptForm from "../hoc-helpers/withSimpleAcceptForm";
import withData from "../hoc-helpers/with-data";
import withMonumentService from "../hoc-helpers/with-monument-service";

function CreateEditParticipant({ data, acceptForm, loading }) {

  const initialValues = {
    defaultName: data ? data.defaultName : "",
    participantRole: data ? data.participantRole || "" : "",
  };

  if (data) {
    supportedCultures.forEach((culture) => {
      const cultureValuePair = data.name.find((p) => (p.code = culture.code));
      initialValues[culture.code] = cultureValuePair
        ? cultureValuePair.value
        : "";
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
    if (data) {
      participant.id = data.id;
    }
    acceptForm([participant]);
  };

  return (
    <CreateEditParticipantForm
      submitForm={submitForm}
      initialValues={initialValues}
      validationSchemaFileds={validationSchemafileds}
      edit={data ? true : false}
      loading={loading}
    />
  );
}

export default withMonumentService(withSimpleAcceptForm(CreateEditParticipant))(
  (ms) => ({
    acceptFormMethod: ms.createParticipant,
  })
);

export const EditParticipant = withMonumentService(
  withData(withSimpleAcceptForm(CreateEditParticipant), ["itemId"])
)((monumentService) => ({
  getData: monumentService.getEditableParticipant,
  acceptFormMethod: monumentService.editParticipant,
}));
