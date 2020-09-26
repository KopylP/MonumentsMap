import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import AdminContext from "../../../../context/admin-context";
import useCancelablePromise from "@rodw95/use-cancelable-promise";

export default function SelectTypeofMonumentFormControl({
  getTypesMethod,
  label,
  value,
  onBlur,
  onChange,
  error,
  helperText,
  name,
}) {
  const [types, setTypes] = useState([]);
  const makeCancelable = useCancelablePromise();


  const onTypesLoad = (types) => {
    setTypes(types);
  };

  const update = () => {
    makeCancelable(getTypesMethod())
      .then(types => {
        setTypes(types);
      })
      .catch(); // TODO handle error 
  };

  useEffect(() => {
    update();
  }, []);

  return (
    <FormControl style={{ width: "100%" }} required>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        error={error}
        name={name}
      >
        {types.map((type) => (
          <MenuItem key={type.id} value={type.id}>
            {type.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}
