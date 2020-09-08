import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../../context/app-context";
import { usePrevious } from "../../../hooks/hooks";
import { Grid, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

export default function StatusFilter() {
  const {
    monumentService,
    selectedStatuses,
    setSelectedStatuses,
    selectedLanguage,
  } = useContext(AppContext);

  const prevSelectedLanguage = usePrevious(selectedLanguage);

  const update = () => {
    monumentService.getAllStatuses().then(onStatusesLoad);
  };

  const onStatusesLoad = (statuses) => {
    setStatuses(statuses);
  };

  const onSelectedStatusesChange = (e) => {
    setSelectedStatuses(e.target.value);
  };

  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    if (
      prevSelectedLanguage == null ||
      selectedLanguage.code !== prevSelectedLanguage.code
    ) {
      update();
    }
  }, [selectedLanguage]);

  const statusViews = statuses.map((status, i) => {
    return (
      <MenuItem key={i} style={{ whiteSpace: "normal" }} value={status.id}>
        {status.name}
      </MenuItem>
    );
  });

  return (
    <Grid item xs="12">
      <FormControl style={{width: "100%"}}>
        <InputLabel>Статус пам'ятки</InputLabel>
        <Select
          multiple
          value={selectedStatuses}
          onChange={onSelectedStatusesChange}
        >
          {statusViews}
        </Select>
      </FormControl>
    </Grid>
  );
}
