import React from "react";
import MonumentsList from "./monuments-list";
import SimpleResource from "../common/simple-resource";
import EditMonument from "./create-edit-monument/edit-monument";
import CreateMonument from "./create-edit-monument/create-monument";

export default function MonumentsResource() {
  return (
    <SimpleResource
      ItemList={MonumentsList}
      CreateItem={CreateMonument}
      UpdateItem={EditMonument}
    />
  );
}
