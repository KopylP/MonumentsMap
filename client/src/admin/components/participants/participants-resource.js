import React from "react";
import SimpleResource from "../common/simple-resource";
import ParticipantsList from "./participants-list";
import CreateEditParticipant, { EditParticipant } from "./create-edit-participant";

export default function ParticipantsResource() {
  return (
    <SimpleResource
      ItemList={ParticipantsList}
      CreateItem={CreateEditParticipant}
      UpdateItem={EditParticipant}
    />
  );
}
