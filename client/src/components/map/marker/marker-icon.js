import React from "react";
import { divIcon } from "leaflet";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ReactDOMServer from "react-dom/server";

export default function markerIcon(color) {
  return divIcon({
    iconAnchor: [17, 32],
    popupAnchor: [1, -19],
    className: "custom-icon",
    html: ReactDOMServer.renderToString(
      <React.Fragment>
        <LocationOnIcon
          style={{
            color: color,
          }}
          fontSize="large"
        />
      </React.Fragment>
    ),
  });
}
