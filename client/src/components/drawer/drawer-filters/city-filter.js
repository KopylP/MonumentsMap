import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../../context/app-context";
import { usePrevious } from "../../../hooks/hooks";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import useCancelablePromise from "@rodw95/use-cancelable-promise";
import { useTranslation } from "react-i18next";
import { changeCities } from "../../../actions/filter-actions";
import { connect } from "react-redux";

function CityFilter({ selectedCities, changeCities }) {
  const {
    monumentService,
    selectedLanguage,
  } = useContext(AppContext);
  const makeCancelable = useCancelablePromise();

  const [cities, setCities] = useState([]);

  const onCitiesLoad = (cities) => {
    setCities(cities);
  };

  const { t } = useTranslation();

  const update = () => {
    makeCancelable(monumentService.getAllCities()).then(onCitiesLoad);
  };

  const prevSelectedLanguage = usePrevious(selectedLanguage);

  const handleLanguageChange = () => {
    if (
      prevSelectedLanguage == null ||
      selectedLanguage.code !== prevSelectedLanguage.code
    ) {
      update();
    }
  }

  useEffect(handleLanguageChange, [selectedLanguage]);

  const handleCitiesChange = () => {

    const newSelectedCities = selectedCities.map((selectedCity) => {
      const cityIndex = cities.findIndex((p) => p.id === selectedCity.id);
      if (cityIndex !== -1) {
        return cities[cityIndex];
      }
      return selectedCity;
    });
    changeCities(newSelectedCities);
  }

  useEffect(handleCitiesChange, [cities]);

  const autoCompliteCitiesOptions = {
    options: cities,
    getOptionLabel: (option) => option.name,
  };

  const onSelectedCitiesChange = (e, newValue) => {
    changeCities(newValue);
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
            label={t("City")}
            margin="normal"
            style={{ margin: 0 }}
          />
        )}
      />
    </Grid>
  );
}

const mapStateToProps = ({ filter: { cities } }) => ({selectedCities: cities});
const mapDispatchToProps = { changeCities };

export default connect(mapStateToProps, mapDispatchToProps)(CityFilter);