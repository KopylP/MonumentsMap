import { FormGroup, Switch } from "@material-ui/core";
import React, { useState } from "react";
import withMonumentService from "../../../components/hoc-helpers/with-monument-service";
import withSimpleAcceptForm from "../hoc-helpers/withSimpleAcceptForm";

function AcceptMonumentTable({ monument, acceptForm }) {
  const [checked, setChecked] = useState(monument.accepted);

  const toggleChecked = () => {
    setChecked((prev) => !prev);
    acceptForm([monument.id], {
      onError: (e) => {
        setChecked((prev) => !prev);
      },
    });
  };

  return (
    <FormGroup>
      <Switch checked={checked} onChange={toggleChecked} />
    </FormGroup>
  );
}

export default withMonumentService(withSimpleAcceptForm(AcceptMonumentTable, false))(
  (ms) => ({
    acceptFormMethod: ms.toogleMonumentAccepted,
  })
);
