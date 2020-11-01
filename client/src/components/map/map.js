import React, { useState, useEffect, useContext, useRef } from "react";
import { Map as LeafMap, TileLayer } from "react-leaflet";
import AppContext from "../../context/app-context";
import MonumentMarker from "./marker/monument-marker";
import { defaultZoom, accessToken, mapStyle } from "../../config";
import { usePrevious } from "../../hooks/hooks";
import { LatLng } from "leaflet";
import { makeStyles } from "@material-ui/core/styles";
import { isChrome, isIOS, isMobileOnly } from "react-device-detect";
import { connect } from "react-redux";
import { changeCenter } from "../../actions/map-actions";

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

function Map({
  monuments,
  onMonumentSelected = (p) => p,
  center,
  changeCenter,
  detailDrawerOpen,
  selectedMonument,
}) {
  const [markers, setMarkers] = useState([]);
  const mapRef = React.useRef(null);
  const [viewPortChange, setViewPortChange] = useState(false);
  const prevCenter = usePrevious(center);
  const classes = useStyles();

  const canClickMarker = useRef(true);

  const closePopups = () => {
    mapRef.current.leafletElement.closePopup();
  };

  const handleMonumentMarkerClick = (monument) => {
    if (canClickMarker.current) {
      onMonumentSelected(monument);
    } else {
      closePopups();
    }
  };

  const handleChangeCenter = ({ lat, lng }) => {
    changeCenter({
      lat: lat + 0.0000001, //Костыль
      lng: lng + 0.0000001, //Костыль
    });
  };

  const getVisibleMonumentMarkers = () => {
    return monuments
      .filter((monument) => {
        if (isIOS && isChrome) return true;
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
    setMarkers(getVisibleMonumentMarkers());
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
      handleChangeCenter(center);
    }
  }, [center]);

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
      duration={0.2}
      onViewportChange={onViewPortChange}
      onmovestart={handleMoveStart}
      onmoveend={handleMoveEnd}
      preferCanvas
      zoom={defaultZoom}
      className={isMobileOnly ? classes.mobileOnlyMapStyles : classes.mapStyles}
      ref={mapRef}
    >
      <TileLayer
        attribution='<a href=\"https://www.jawg.io\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors'
        url={`https://tile.jawg.io/${mapStyle}/{z}/{x}/{y}.png?access-token=${accessToken}`}
      />
      {markers}
    </LeafMap>
  );
}

const mapStateToProps = ({
  monument: { monuments },
  map: { center },
  detailMonument: { detailDrawerOpen, selectedMonument },
}) => ({
  monuments,
  center,
  detailDrawerOpen,
  selectedMonument,
});

const mapDispatchToProps = { changeCenter };
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Map));
