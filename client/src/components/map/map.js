import React, { useState, useEffect, useContext } from "react";
import { Map as LeafMap, TileLayer, Marker, Popup } from "react-leaflet";
import AppContext from "../../context/app-context";
import MonumentMarker from "./marker/monument-marker";
import { defaultCity, defaultZoom, accessToken } from "../../config";
import { usePrevious } from "../../hooks/hooks";
import { arraysEqual } from "../helpers/array-helpers";

function Map({ onMonumentSelected = (p) => p }) {
  const { detailDrawerOpen, monuments } = useContext(AppContext);
  const [markers, setMarkers] = useState([]);
  const mapRef = React.useRef(null);

  const closePopups = () => {
    mapRef.current.leafletElement.closePopup();
  };

  const [center, setCenter] = useState(defaultCity);

  useEffect(() => {
    if (typeof monuments !== "undefined") {
      setMarkers(
        monuments.map((monument, i) => {
          return (
            <MonumentMarker
              onClick={onMonumentSelected}
              monument={monument}
              key={i}
            />
          );
        })
      );
    }
  }, [monuments]);

  useEffect(() => {
    if (detailDrawerOpen === false) closePopups();
  }, [detailDrawerOpen]);

  return (
    <LeafMap
      center={center}
      animate
      zoom={defaultZoom}
      style={{ width: "100%", height: "100vh" }}
      ref={mapRef}
    >
      <TileLayer
        attribution='<a href=\"https://www.jawg.io\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors'
        url={`https://tile.jawg.io/13da1c9b-4dd5-4a96-84a0-d0464fc95920/{z}/{x}/{y}.png?access-token=${accessToken}`}
      />
      {markers}
    </LeafMap>
  );
}

export default React.memo(Map);
