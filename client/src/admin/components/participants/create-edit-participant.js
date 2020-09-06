import React, { useContext } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { supportedCultures } from "../../../config";
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
import { useHistory } from "react-router-dom";
import withData from "../../../components/hoc-helpers/with-data";
import withMonumentService from "../../../components/hoc-helpers/with-monument-service";
import { useSnackbar } from "notistack";
import AdminContext from "../../context/admin-context";
import errorNetworkSnackbar from "../../../components/helpers/error-network-snackbar";
import SimpleSubmitForm from "../common/simple-submit-form";

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
    data.name.forEach((cultureValuePair) => {
      initialValues[cultureValuePair.culture] = cultureValuePair.value;
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
      .catch(e => errorNetworkSnackbar(enqueueSnackbar, e.response && e.response.status));
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchemafileds),
    onSubmit: submitForm,
  });

  const history = useHistory();

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h2>{ data ? 'Редагувати': 'Створити нового' } учасника будівництва</h2>
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
      <SimpleSubmitForm disableSubmit={!Object.keys(formik.touched).length > 0}/>
    </form>
  );
}

export const EditParticipant = withMonumentService(
  withData(CreateEditParticipant, ["itemId"])
)((monumentService) => ({
  getData: monumentService.getEditableParticipant,
}));
