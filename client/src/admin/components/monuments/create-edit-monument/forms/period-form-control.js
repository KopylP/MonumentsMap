import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";
import React from "react";
import Period from "../../../../../models/period";

export default function PeriodFormControl({
  label,
  value,
  onChange,
  onBlur,
  name,
  helperText,
  error,
  required = false
}) {
  return (
    <FormControl style={{ width: "100%" }} required={required}>
      <InputLabel>{label}</InputLabel>
      <Select
        labelId={name}
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        error={error}
      >
        <MenuItem value={Period.Year}>Рік</MenuItem>
        <MenuItem value={Period.StartOfCentury}>Початок століття</MenuItem>
        <MenuItem value={Period.MiddleOfCentury}>Середина століття</MenuItem>
        <MenuItem value={Period.EndOfCentury}>Кінець століття</MenuItem>
        <MenuItem value={Period.Decades}>Десятиліття</MenuItem>
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}
