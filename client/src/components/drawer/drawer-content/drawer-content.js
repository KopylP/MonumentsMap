import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Fab from "@material-ui/core/Fab";
import { makeStyles, Input } from "@material-ui/core";

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


const useStyles = makeStyles((theme) => ({
  marginTop13: {
    marginTop: 13,
  },
  marginTop20: {
    marginTop: 20,
  },
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

  const { monumentService } = useContext(AppContext);
  const [cities, setCities] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  
  const onCitiesLoad = (cities) => {
    console.log(cities);
    setCities(cities);
  }

  const onStatusesLoad = (statuses) => {
    console.log(statuses);
    setStatuses(statuses);
  }

  const onConditionsLoad = (conditions) => {
    console.log(conditions);
    setConditions(conditions);
  }

  const update = () => {
    monumentService.getAllStatuses().then(onStatusesLoad);
    monumentService.getAllConditions().then(onConditionsLoad);
    monumentService.getAllCities().then(onCitiesLoad);
  }

  useEffect(() => {
    update();
  }, [monumentService]);

  useEffect(() => {
    const newSelectedCities = selectedCities.map(selectedCity => {
      const cityIndex = cities.findIndex(p => p.id === selectedCity.id);
      if(cityIndex !== -1) {
        return cities[cityIndex];
      }
      return selectedCity;
    });
    setSelectedCities(newSelectedCities);
  }, [cities])


  const autoCompliteCitiesOptions = {
    options: cities,
    getOptionLabel: (option) => option.name,
  };

  const statusViews = statuses.map(status => {
    return <MenuItem style={{whiteSpace: 'normal'}} value={status.id}>{status.name}</MenuItem>
  });

  const conditionViews = conditions.map(condition => {
    return <MenuItem style={{whiteSpace: 'normal'}} value={condition.id}>{condition.name}</MenuItem>
  });

  const onSelectedStatusesChange = (e) => {
    setSelectedStatuses(e.target.value);
  };

  const onSelectedConditionsChange = (e) => {
    setSelectedConditions(e.target.value);
  };

  const onSelectedCitiesChange = (e, newValue) => {
    setSelectedCities(newValue);
  }

  return (
    <div style={{ flexGrow: 1, padding: 15 }}>
      <Grid xs="12" vertical>
        <SelectLanguage />
        <Grid item xs="12">
          <Autocomplete
            {...autoCompliteCitiesOptions}
            id="clear-on-escape"
            clearOnEscape
            value={selectedCities}
            multiple
            onChange={onSelectedCitiesChange}
            renderInput={(params) => (
              <TextField {...params} label="Місто" margin="normal" />
            )}
          />
        </Grid>
        <Grid item xs="12" className={classes.marginTop13}>
          <FormControl className={classes.width100per}>
            <InputLabel>Статус пам'ятки</InputLabel>
            <Select multiple value={selectedStatuses} onChange={onSelectedStatusesChange}>
              {statusViews}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs="12" className={classes.marginTop20}>
          <FormControl className={classes.width100per}>
            <InputLabel>Стан пам'ятки архітектури</InputLabel>
            <Select multiple value={selectedConditions} onChange={onSelectedConditionsChange}>
              {conditionViews}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs="12" className={classes.marginTop20}>
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
    </div>
  );
}
