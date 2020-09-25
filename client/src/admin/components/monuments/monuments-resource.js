import React from "react";
import MonumentsList from "./monuments-list";
import SimpleResource from "../common/simple-resource";
import CreateEditMonument from "./create-edit-monument/create-edit-monument";
import EditMonument from "./create-edit-monument/edit-monument";

export default function MonumentsResource() {
  return (
    <SimpleResource
      ItemList={MonumentsList}
      CreateItem={CreateEditMonument}
      UpdateItem={EditMonument}
    />
  );
}
