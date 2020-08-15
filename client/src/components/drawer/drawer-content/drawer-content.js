import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Fab from "@material-ui/core/Fab";
import { makeStyles, Input, Box } from "@material-ui/core";

import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SelectLanguage from "../../select-language/select-language";
import AppContext from "../../../context/app-context";
import { usePrevious } from "../../../hooks/hooks";
import MonumentListAdminPanel from "../../admin-panels/monument-list-admin-panel/monument-list-admin-panel";
import MainMonumentList from "./main-monument-list/main-monument-list";

const useStyles = makeStyles((theme) => ({
  colorWhite: {
    color: "white",
  },
  width100per: {
    width: "100%",
  },
  fabAdd: {
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 999,
    visibility: "hidden",
    [theme.breakpoints.up("sm")]: {
      visibility: "visible",
    },
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
    monuments
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

  return (
    <div style={{ flex: "1 1 auto", padding: 15, display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
      <Grid container vertical justify="flex-start" spacing={2}>
        <Grid item xs="12">
          <MonumentListAdminPanel />
        </Grid>
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
              <TextField {...params} label="Місто" margin="normal" style={{margin: 0}}/>
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
        <Grid item xs="12">
          <Grid
            container
            spacing={1}
            alignItems="flex-end"
            justify="space-between"
            className={classes.searchField}
          >
            <Grid item xs="1">
              <SearchIcon />
            </Grid>
            <Grid item xs="11">
              <TextField
                className={classes.width100per}
                id="input-with-icon-grid"
                label="Пошук за адресою"
              />
            </Grid>
          </Grid>
        </Grid>
        <Fab
          color="primary"
          aria-label="add"
          className={classes.fabAdd}
          onClick={onAdd}
        >
          <AddIcon className={classes.colorWhite} />
        </Fab>
      </Grid>
      <Box component="div" display={{ xs: 'none', sm: 'block' }} style={{ width: "100%", flex: "1 1 auto", marginTop: 15 }}>
        <MainMonumentList data={monuments}/>
      </Box>
    </div>
  );
}
