import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../../context/app-context";
import { usePrevious } from "../../../hooks/hooks";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

export default function ConditionFilter() {
  const {
    monumentService,
    selectedConditions,
    setSelectedConditions,
    selectedLanguage,
  } = useContext(AppContext);

  const prevSelectedLanguage = usePrevious(selectedLanguage);

  const update = () => {
    monumentService.getAllConditions().then(onConditionsLoad);
  };

  const [conditions, setConditions] = useState([]);

  const onConditionsLoad = (conditions) => {
    setConditions(conditions);
  };

  const conditionViews = conditions.map((condition, i) => {
    return (
      <MenuItem key={i} style={{ whiteSpace: "normal" }} value={condition.id}>
        {condition.name}
      </MenuItem>
    );
  });

  const onSelectedConditionsChange = (e) => {
    setSelectedConditions(e.target.value);
  };

  useEffect(() => {
    if (
      prevSelectedLanguage == null ||
      selectedLanguage.code !== prevSelectedLanguage.code
    ) {
      update();
    }
  }, [selectedLanguage]);

  return (
    <Grid item xs="12">
      <FormControl style={{width: "100%"}}>
        <InputLabel>Стан пам'ятки архітектури</InputLabel>
        <Select
          multiple
          value={selectedConditions}
          onChange={onSelectedConditionsChange}
        >
          {conditionViews}
        </Select>
      </FormControl>
    </Grid>
  );
}
