import React, { useState, useEffect, useContext } from "react";
import { Map as LeafMap, TileLayer, Marker, Popup } from "react-leaflet";
import AppContext from "../../context/app-context";
import MonumentMarker from "./marker/monument-marker";
import { defaultCity, defaultZoom, accessToken } from "../../config";
import { usePrevious } from "../../hooks/hooks";
import { arraysEqual } from "../helpers/array-helpers";

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

  const [cancelRequest, setCancelRequest] = useState(null);



  const [center, setCenter] = useState(defaultCity);

  function executor(e) {
    setCancelRequest({
      cancel: e
    });
  }

  const update = () => {
    if(cancelRequest) {
      cancelRequest.cancel();
    }

    monumentService
      .getMonumentsByFilter(selectedCities.map(c => c.id), selectedStatuses, selectedConditions, executor)
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
        }))
      });
  };

  const prevSelectedLanguage = usePrevious(selectedLanguage);
  const prevSelectedConditions = usePrevious(selectedConditions);
  const prevSelectedCities = usePrevious(selectedCities);
  const prevSelectedStatuses = usePrevious(selectedStatuses);

  useEffect(() => {
    if (
      prevSelectedLanguage == null ||
      selectedLanguage.code !== prevSelectedLanguage.code
    )
      update();
  }, [selectedLanguage]);

  useEffect(() => {
    if(typeof prevSelectedConditions !== "undefined" && !arraysEqual(prevSelectedConditions, selectedConditions)){
      update();
    }
  }, [selectedConditions])

  useEffect(() => {
    if(typeof prevSelectedCities !== "undefined" && !arraysEqual(prevSelectedCities, selectedCities)){
      update();
    }
    
  }, [selectedCities])

  useEffect(() => {
    if(typeof prevSelectedStatuses !== "undefined" && !arraysEqual(prevSelectedStatuses, selectedStatuses)){
      update();
    }
  }, [selectedStatuses])


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
