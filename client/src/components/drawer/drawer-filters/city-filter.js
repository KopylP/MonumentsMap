import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../../context/app-context";
import { usePrevious } from "../../../hooks/hooks";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Grid, TextField } from "@material-ui/core";
import useCancelablePromise from "@rodw95/use-cancelable-promise";

export default function CityFilter() {
  const {
    monumentService,
    selectedLanguage,
    selectedCities,
    setSelectedCities,
  } = useContext(AppContext);
  const makeCancelable = useCancelablePromise();

  const [cities, setCities] = useState([]);

  const onCitiesLoad = (cities) => {
    setCities(cities);
  };

  const update = () => {
    makeCancelable(monumentService.getAllCities()).then(onCitiesLoad);
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

  const onSelectedCitiesChange = (e, newValue) => {
    setSelectedCities(newValue);
  };

  return (
    <Grid item xs={12}>
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
  );
}
