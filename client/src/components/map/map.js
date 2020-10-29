import React, { useState, useEffect, useContext, useRef } from "react";
import { Map as LeafMap, TileLayer } from "react-leaflet";
import AppContext from "../../context/app-context";
import MonumentMarker from "./marker/monument-marker";
import { defaultZoom, accessToken, loadMapZoom, mapStyle } from "../../config";
import { usePrevious } from "../../hooks/hooks";
import MapContext from "../../context/map-context";
import { LatLng } from "leaflet";
import { makeStyles } from "@material-ui/core/styles";
import { isMobileOnly } from "react-device-detect";

const useStyles = makeStyles({
  mobileOnlyMapStyles: {
    flexGrow: 1,
  },
  mapStyles: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

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
  const [mapZoom, setMapZoom] = useState(loadMapZoom);
  const classes = useStyles();

  const canClickMarker = useRef(true);

  const closePopups = () => {
    mapRef.current.leafletElement.closePopup();
  };

  const changeMapZoomToDefault = () => {
    if (mapZoom === loadMapZoom) {
      setMapZoom(defaultZoom);
    }
  };

  const handleMonumentMarkerClick = (monument) => {
    if (canClickMarker.current) {
      onMonumentSelected(monument);
    } else {
      closePopups();
    }
  };

  const changeCenter = ({ lat, lng }) => {
    setCenter({
      lat: lat + 0.0000001, //Костыль
      lng: lng + 0.0000001, //Костыль
    });
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
            onClick={handleMonumentMarkerClick}
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
      changeMapZoomToDefault();
      changeCenter(center);
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

  const handleMoveStart = () => {
    if (canClickMarker.current) {
      canClickMarker.current = false;
      console.log("start");
    }
  };

  const handleMoveEnd = () => {
    updateMarkers();
    canClickMarker.current = true;
  };

  return (
    <LeafMap
      center={center}
      animate
      duration={0.1}
      onViewportChange={onViewPortChange}
      onmovestart={handleMoveStart}
      onmoveend={handleMoveEnd}
      preferCanvas
      onpopupclose={() => {
        setMapSelectedMonumentId(null);
      }}
      zoom={mapZoom}
      className={isMobileOnly ? classes.mobileOnlyMapStyles : classes.mapStyles}
      ref={mapRef}
    >
      <TileLayer
        attribution='<a href=\"https://www.jawg.io\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors'
        url={`https://tile.jawg.io/${mapStyle}/{z}/{x}/{y}.png?access-token=${accessToken}`}
      />
      <MapContext.Provider value={{ mapSelectedMonumentId }}>
        {markers}
      </MapContext.Provider>
    </LeafMap>
  );
}

export default React.memo(Map);
