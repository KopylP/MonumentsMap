import React from "react";
import SimpleResource from "../common/simple-resource";
import ParticipantsList from "./participants-list";
import EditParticipant from "./edit-participant";

export default function ParticipantsResource() {
  return (
    <SimpleResource
      ItemList={ParticipantsList}
      CreateItem={EditParticipant}
      UpdateItem={EditParticipant}
    />
  );
}
