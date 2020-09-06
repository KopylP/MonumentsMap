import React from "react";
import { Grid } from "@material-ui/core";
import MonumentsList from "./monuments-list";
import SimpleResource from "../common/simple-resource";
import CreateEditMonument from "./create-edit-monument/create-edit-monument";

export default function MonumentsResource() {
  return (
    <SimpleResource
      ItemList={MonumentsList}
      CreateItem={CreateEditMonument}
    />
  );
}
