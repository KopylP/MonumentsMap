import React, { useState, useEffect, useContext } from "react";
import { Map as LeafMap, TileLayer, Marker, Popup } from "react-leaflet";
import AppContext from "../../context/app-context";
import MonumentMarker from "./marker/monument-marker";
import { defaultCity, defaultZoom } from "../../config";
import { usePrevious } from "../../hooks/hooks";

function Map({ onMonumentSelected = (p) => p }) {
  const {
    monumentService,
    detailDrawerOpen,
    selectedLanguage,
    selectedConditions,
    selectedCities,
    selectedStatuses,
  } = useContext(AppContext);
  const [monuments, setMonuments] = useState([]);
  const [markers, setMarkers] = useState([]);
  const mapRef = React.useRef(null);

  const closePopups = () => {
    mapRef.current.leafletElement.closePopup();
  };

  const update = () => {
    monumentService
      .getMonumentsByFilter(selectedCities.map(c => c.id), selectedStatuses, selectedConditions)
      .then((monuments) => {
        setMonuments(monuments);
        setMarkers(monuments.map((monument, i) => {
          return (
            <MonumentMarker
              onClick={onMonumentSelected}
              monument={monument}
              key={i}
            />
          );
        }));
      });
  };

  const prevSelectedLanguage = usePrevious(selectedLanguage);

  useEffect(() => {
    if (
      prevSelectedLanguage == null ||
      selectedLanguage.code !== prevSelectedLanguage.code
    )
      update();
  }, [selectedLanguage]);

  useEffect(() => {
    update();
  }, [selectedConditions, selectedCities, selectedStatuses])

  useEffect(() => {
    if (detailDrawerOpen === false) closePopups();
  }, [detailDrawerOpen]);

  return (
    <LeafMap
      center={defaultCity}
      zoom={defaultZoom}
      style={{ width: "100%", height: "100vh" }}
      ref={mapRef}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers}
    </LeafMap>
  );
}

export default React.memo(Map);
