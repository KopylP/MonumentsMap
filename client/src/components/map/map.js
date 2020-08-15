import React, { useState, useEffect, useContext } from "react";
import { Map as LeafMap, TileLayer, Marker, Popup } from "react-leaflet";
import AppContext from "../../context/app-context";
import MonumentMarker from "./marker/monument-marker";
import { defaultZoom, accessToken } from "../../config";
import { usePrevious } from "../../hooks/hooks";
import MapContext from "../../context/map-context";
import { LatLng } from "leaflet";
import { isMobile } from "react-device-detect";
import FullWindowHeightContainer from "../common/full-window-height-container/full-window-height-container";

function Map({ onMonumentSelected = (p) => p }) {
  const {
    detailDrawerOpen,
    monuments,
    center,
    setCenter,
    selectedMonument,
  } = useContext(AppContext);
  const [markers, setMarkers] = useState([]);
  const mapRef = React.useRef(null);
  const [mapSelectedMonumentId, setMapSelectedMonumentId] = useState(null);
  const [viewPortChange, setViewPortChange] = useState(false);
  const prevCenter = usePrevious(center);

  const [monumentWithPopupId, setMonumentWithPopupId] = useState(null);

  const closePopups = () => {
    mapRef.current.leafletElement.closePopup();
    setMonumentWithPopupId(null);
  };

  const getVisibleMonumentMarkers = () => {
    return monuments
      .filter((monument) => {
        const latLng = new LatLng(monument.latitude, monument.longitude);
        const markerOnMap = mapRef.current.leafletElement
          .getBounds()
          .contains(latLng);
        return markerOnMap;
      })
      .map((monument, i) => {
        return (
          <MonumentMarker
            onClick={(e) => {
              setMonumentWithPopupId(e);
              onMonumentSelected(e);
            }}
            monument={monument}
            selectedMonumentId={selectedMonument && selectedMonument.id}
            key={monument.id}
          />
        );
      });
  };

  useEffect(() => {
    if (typeof monuments !== "undefined") {
      setMarkers(getVisibleMonumentMarkers());
    }
  }, [monuments]);

  useEffect(() => {
    if (detailDrawerOpen === false) closePopups();
  }, [detailDrawerOpen]);

  useEffect(() => {
    if (
      typeof prevCenter !== "undefined" &&
      prevCenter.lat === center.lat &&
      prevCenter.lng === center.lng
    ) {
      setCenter({
        lat: center.lat + 0.0000001, //Костыль
        lng: center.lng + 0.0000001, //Костыль
      });
    }
  }, [center]);

  useEffect(() => {
    if (selectedMonument.showPopup) {
      setMapSelectedMonumentId({ id: selectedMonument.id });
    }
  }, [selectedMonument]);

  const updateMarkers = () => {
    setMarkers(getVisibleMonumentMarkers());
  };

  const onViewPortChange = () => {
    if (viewPortChange === false) {
      setViewPortChange(true);
      updateMarkers();
      setTimeout(() => {
        setViewPortChange(false);
      }, 150);
    }
  };

  return (
      <LeafMap
        center={center}
        animate
        duration={0.1}
        onViewportChange={onViewPortChange}
        onmoveend={updateMarkers}
        preferCanvas
        onpopupclose={() => {
          setMapSelectedMonumentId(null);
        }}
        zoom={defaultZoom}
        style={{
          width: "100%",
          height: "100%"
        }}
        ref={mapRef}
      >
        <TileLayer
          attribution='<a href=\"https://www.jawg.io\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors'
          url={`https://tile.jawg.io/13da1c9b-4dd5-4a96-84a0-d0464fc95920/{z}/{x}/{y}.png?access-token=${accessToken}`}
        />
        <MapContext.Provider value={{ mapSelectedMonumentId }}>
          {markers}
        </MapContext.Provider>
      </LeafMap>
  );
}

export default React.memo(Map);
