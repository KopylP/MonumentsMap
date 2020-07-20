import React from "react";
import { Marker, divIcon } from "leaflet";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ReactDOMServer from "react-dom/server";

export default function markerIcon(color) {
  return divIcon({
    iconAnchor: [17, 32],
    className: "custom-icon",
    html: ReactDOMServer.renderToString(
        <LocationOnIcon style={{
          color: color,
        }} fontSize="large" />
    ),
  });
}
