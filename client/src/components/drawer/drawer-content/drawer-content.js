import React, { useContext, useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles, Input, Box, useTheme } from "@material-ui/core";

import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import SelectLanguage from "../../select-language/select-language";
import AppContext from "../../../context/app-context";
import { usePrevious } from "../../../hooks/hooks";
import MainMonumentList from "./main-monument-list/main-monument-list";
import SearchableMainMonumentList from "./main-monument-list/searchable-main-monument-list";

const useStyles = makeStyles((theme) => ({
  colorWhite: {
    color: "white",
  },
  width100per: {
    width: "100%",
  },
  searchField: {
    marginBottom: 20,
    [theme.breakpoints.up("sm")]: {
      marginBottom: 0,
    },
  },
}));

export default function DrawerContent(props) {
  const classes = useStyles(props);
  const { onAdd } = props;

  const {
    monumentService,
    selectedLanguage,
    selectedConditions,
    setSelectedConditions,
    selectedCities,
    setSelectedCities,
    selectedStatuses,
    setSelectedStatuses,
    monuments,
  } = useContext(AppContext);

  const [cities, setCities] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const onCitiesLoad = (cities) => {
    setCities(cities);
  };

  const onStatusesLoad = (statuses) => {
    setStatuses(statuses);
  };

  const onConditionsLoad = (conditions) => {
    setConditions(conditions);
  };

  const update = () => {
    monumentService.getAllStatuses().then(onStatusesLoad);
    monumentService.getAllConditions().then(onConditionsLoad);
    monumentService.getAllCities().then(onCitiesLoad);
  };

  const prevSelectedLanguage = usePrevious(selectedLanguage);

  useEffect(() => {
    if (
      prevSelectedLanguage == null ||
      selectedLanguage.code !== prevSelectedLanguage.code
    ) {
      update();
    }
  }, [selectedLanguage]);

  useEffect(() => {
    const newSelectedCities = selectedCities.map((selectedCity) => {
      const cityIndex = cities.findIndex((p) => p.id === selectedCity.id);
      if (cityIndex !== -1) {
        return cities[cityIndex];
      }
      return selectedCity;
    });
    setSelectedCities(newSelectedCities);
  }, [cities]);

  const autoCompliteCitiesOptions = {
    options: cities,
    getOptionLabel: (option) => option.name,
  };

  const statusViews = statuses.map((status, i) => {
    return (
      <MenuItem key={i} style={{ whiteSpace: "normal" }} value={status.id}>
        {status.name}
      </MenuItem>
    );
  });

  const conditionViews = conditions.map((condition, i) => {
    return (
      <MenuItem key={i} style={{ whiteSpace: "normal" }} value={condition.id}>
        {condition.name}
      </MenuItem>
    );
  });

  const onSelectedStatusesChange = (e) => {
    setSelectedStatuses(e.target.value);
  };

  const onSelectedConditionsChange = (e) => {
    setSelectedConditions(e.target.value);
  };

  const onSelectedCitiesChange = (e, newValue) => {
    setSelectedCities(newValue);
  };

  const theme = useTheme();

  return (
    <div
      style={{
        flex: "1 1 auto",
        padding: 15,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <Grid container vertical justify="flex-start" spacing={2}>
        <Grid item xs="12">
          <SelectLanguage />
        </Grid>
        <Grid item xs="12">
          <Autocomplete
            {...autoCompliteCitiesOptions}
            id="clear-on-escape"
            clearOnEscape
            value={selectedCities}
            multiple
            onChange={onSelectedCitiesChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Місто"
                margin="normal"
                style={{ margin: 0 }}
              />
            )}
          />
        </Grid>
        <Grid item xs="12">
          <FormControl className={classes.width100per}>
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
        <Grid item xs="12">
          <FormControl className={classes.width100per}>
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
      </Grid>
      {/* search */}
      <SearchableMainMonumentList monuments={monuments}/>
    </div>
  );
}
