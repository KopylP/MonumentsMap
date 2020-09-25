import { FormControlLabel, FormGroup, Switch } from "@material-ui/core";
import React, { useContext, useState } from "react";
import AdminContext from "../../context/admin-context";
import useCancelablePromise from "@rodw95/use-cancelable-promise";
import { useSnackbar } from "notistack";
import errorNetworkSnackbar from "../../../components/helpers/error-network-snackbar";

export default function AcceptMonumentTable({ monument }) {
  const makeCancelable = useCancelablePromise();
  const { enqueueSnackbar } = useSnackbar();

  const {
    monumentService: { toogleMonumentAccepted },
  } = useContext(AdminContext);

  const [checked, setChecked] = useState(monument.accepted);

  const toggleChecked = () => {
    setChecked((prev) => !prev);
    makeCancelable(toogleMonumentAccepted(monument.id))
      .then()
      .catch((e) => {
        setChecked((prev) => !prev);
        errorNetworkSnackbar(enqueueSnackbar, e.response && e.response.status); 
      });
  };

  return (
    <FormGroup>
      <Switch checked={checked} onChange={toggleChecked} />
    </FormGroup>
  );
}
