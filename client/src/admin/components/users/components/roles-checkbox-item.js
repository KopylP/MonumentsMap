import { Checkbox, FormControlLabel } from "@material-ui/core";
import React from "react";

export default function RoleCheckboxItem({ role, checked, onChange, onBlur }) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          name={role}
        />
      }
      label={role}
    />
  );
}
