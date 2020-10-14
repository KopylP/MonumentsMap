import React, { useState } from "react";
import AsynchronousAutocomplite from "../common/ui/asynchronous-autocomplite";
import withSimpleAcceptForm from "../hoc-helpers/withSimpleAcceptForm";
import { useQuery } from "../../../hooks/hooks";
import SimpleTitle from "../common/ui/simple-title";
import { Grid } from "@material-ui/core";
import SimpleSubmitForm from "../common/simple-submit-form";
import { useParams } from "react-router-dom";
import withMonumentService from "../hoc-helpers/with-monument-service";
import withData from "../hoc-helpers/with-data";

function EditMonumentParticipants({
  data,
  getOptionsMethod,
  loading,
  acceptForm,
}) {
  const [participants, setParticipants] = useState(data);
  const query = useQuery();
  const { itemId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(participants);
    acceptForm([itemId, participants]);
  };

  const handleChange = (e, newValue) => {
    setParticipants(newValue);
  };

  return (
    <form style={{ width: 500 }} onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <SimpleTitle
          text={`Учасники будівництва пам'ятки "${query.get("name")}"`}
        />
        <Grid item xs={12}>
          <AsynchronousAutocomplite
            label="Учасники будівництва"
            nameExtractor={(p) => p.defaultName}
            getOptionsMethod={getOptionsMethod}
            defaultValue={data}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <SimpleSubmitForm loading={loading} />
        </Grid>
      </Grid>
    </form>
  );
}

export default withMonumentService(
  withData(withSimpleAcceptForm(EditMonumentParticipants), ["itemId"])
)((monumentService) => ({
  getData: monumentService.getMonumentRawParticipants,
  acceptFormMethod: monumentService.editMonumentParticipants,
  getOptionsMethod: monumentService.getParticipants,
}));
