import React, { useContext, useEffect, useRef, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import markerIcon from "./marker-icon";
import AppContext from "../../../context/app-context";
import { popup } from "leaflet";
import { usePrevious } from "../../../hooks/hooks";
import MapContext from "../../../context/map-context";

export default function MonumentMarker({ monument, onClick = (p) => p }) {
  let markerColor;
  const { mapSelectedMonumentId } = useContext(MapContext);
  const prevMapSelectedMonumentId = usePrevious(mapSelectedMonumentId);

  const markerRef = useRef(null);

  useEffect(() => {
    console.log("mapSelectedMonumentId", mapSelectedMonumentId);
    if (
      mapSelectedMonumentId != null &&
      mapSelectedMonumentId !== prevMapSelectedMonumentId &&
      mapSelectedMonumentId.id === monument.id
    ) {
      markerRef.current.leafletElement.openPopup();
    }
  }, [mapSelectedMonumentId]);

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
      onclick={(e) => onClick(monument.id)}
      icon={markerIcon(markerColor)}
      position={{
        lat: monument.latitude,
        lng: monument.longitude,
      }}
      ref={markerRef}
    >
      <Popup>{monument.name}</Popup>
    </Marker>
  );
}
