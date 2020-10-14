import { FormControl, FormLabel, FormGroup } from "@material-ui/core";
import React from "react";
import { supportedRoles } from "../../../../config";
import RoleCheckboxItem from "./roles-checkbox-item";

export default function RolesFormList({ values, onChange, onBlur, displayName }) {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{displayName}</FormLabel>
      <FormGroup>
        {supportedRoles.map((role) => (
          <RoleCheckboxItem role={role} onChange={onChange} onBlur={onBlur} checked={values[role]}/>
        ))}
      </FormGroup>
    </FormControl>
  );
}
