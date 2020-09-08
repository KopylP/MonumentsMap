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
import useCancelablePromise from '@rodw95/use-cancelable-promise';

export default function DefaultFilter({
  selectedValues,
  setSelectedValues,
  multiple = false,
  getDataMethod,
  title,
}) {
  const { selectedLanguage } = useContext(AppContext);
  const prevSelectedLanguage = usePrevious(selectedLanguage);
  const [data, setData] = useState([]);
  const makeCancelable = useCancelablePromise();

  const update = () => {
    makeCancelable(getDataMethod()).then(onDataLoad);
  };
  const onDataLoad = (data) => {
    setData(data);
  };

  const dataViews = data.map((d, i) => {
    return (
      <MenuItem key={i} style={{ whiteSpace: "normal" }} value={d.id}>
        {d.name}
      </MenuItem>
    );
  });

  const onSelectedDataChange = (e) => {
    setSelectedValues(e.target.value);
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
    <Grid item xs={12}>
      <FormControl style={{ width: "100%" }}>
        <InputLabel>{title}</InputLabel>
        <Select
          multiple={multiple}
          value={selectedValues}
          onChange={onSelectedDataChange}
        >
          {dataViews}
        </Select>
      </FormControl>
    </Grid>
  );
}
