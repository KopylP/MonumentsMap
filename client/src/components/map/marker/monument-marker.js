import React from "react";
import { Marker } from "react-leaflet";
import markerIcon from "./marker-icon";

export default function MonumentMarker({ monument, onClick = (p) => p }) {
  let markerColor;
  switch (monument.condition.abbreviation) {
    case "good-condition":
      markerColor = "green";
      break;
    case "lost":
      markerColor = "red";
      break;
    case "lost-recently":
      markerColor = "red";
      break;
    case "verge-of-loss":
      markerColor = "orange";
      break;
    case "needs-repair":
      markerColor = "orange";
      break;
    default:
      markerColor = "green";
  }

  return (
    <Marker
      onclick={() => onClick(monument.id)}
      icon={markerIcon(markerColor)}
      position={{
        lat: monument.latitude,
        lng: monument.longitude,
      }}
    ></Marker>
  );
}
