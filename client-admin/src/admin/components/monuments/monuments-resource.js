import React from "react";
import MonumentsList from "./monuments-list";
import SimpleResource from "../common/simple-resource";
import EditMonument from "./create-edit-monument/edit-monument";
import CreateMonument from "./create-edit-monument/create-monument";
import EditMonumentParticipants from "./edit-monument-participants";
import EditMonumentTags from "./edit-monument-tags/edit-monument-tags";

export default function MonumentsResource() {
  return (
    <SimpleResource
      ItemList={MonumentsList}
      CreateItem={CreateMonument}
      UpdateItem={EditMonument}
      extra={[
        {
          route: ":itemId/participants",
          Component: EditMonumentParticipants,
        },
        {
          route: ":itemId/tags",
          Component: EditMonumentTags
        }
      ]}
    />
  );
}
