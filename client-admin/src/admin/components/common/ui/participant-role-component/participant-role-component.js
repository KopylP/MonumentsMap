import React from "react";
import ParticipantRole from "../../../../../models/participant-role";

export default function ParticipantRoleComponent({ participantRole }) {
  let text = "";
  switch (participantRole) {
    case ParticipantRole.Architect:
      text = "Архітектор";
      break;
    case ParticipantRole.Sculptor:
      text = "Скульптор";
      break;
    case ParticipantRole.Сontractor:
      text = "Підрядник";
      break;
    default:
        text = "Невідомо";
  }
  return <span>{text}</span>;
}
