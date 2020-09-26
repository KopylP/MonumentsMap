import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useCancelablePromise from "@rodw95/use-cancelable-promise";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PropTypes from "prop-types";

const AutocompleteComponent = ({
  citiesAutocompleteProps,
  onBlur,
  onAutocompliteChange,
  onTextFieldChange,
  autocompliteName,
  value,
  textFieldName,
  helperText,
  error,
  label
}) => (
  <Autocomplete
    {...citiesAutocompleteProps}
    id="clear-on-escape"
    clearOnEscape
    name={autocompliteName}
    value={value}
    onBlur={onBlur}
    
    onChange={onAutocompliteChange}
    style={{
      marginTop: -16,
    }}
    renderInput={(params) => (
      <TextField
        required
        {...params}
        label={label}
        margin="normal"
        onBlur={onBlur}
        onChange={onTextFieldChange}
        name={textFieldName}
        error={error}
        helperText={helperText}
      />
    )}
  />
);

export default function CityFormControl(props) {
  const makeCancelable = useCancelablePromise();
  const [cities, setCities] = useState([]);
  const { getCitiesMethod, onCitiesLoad } = props;
  const handleLoadCities = (cities) => {
    setCities(cities);
    onCitiesLoad(cities);
  };

  useEffect(() => {
    makeCancelable(getCitiesMethod())
      .then(handleLoadCities)
      .catch(); // TODO handle error
  }, []);

  const citiesAutocompleteProps = {
    options: cities,
    getOptionLabel: (option) => option.name,
  };

  return (
    <AutocompleteComponent
      citiesAutocompleteProps={citiesAutocompleteProps}
      {...props}
    />
  );
}

CityFormControl.propTypes = {
  citiesAutocompleteProps: PropTypes.any.isRequired,
  onBlur: PropTypes.func,
  onAutocompliteChange: PropTypes.func,
  onTextFieldChange: PropTypes.func,
  autocompliteName: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  textFieldName: PropTypes.any.isRequired,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  label: PropTypes.string
};