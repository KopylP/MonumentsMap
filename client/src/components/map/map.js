import React, { useEffect } from "react";
import MonumentMarker from "./marker/monument-marker";
import { defaultZoom } from "../../config";
import { usePrevious } from "../../hooks/hooks";
import { makeStyles, StylesProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { changeCenter } from "../../actions/map-actions";
import {
  GoogleMap,
  LoadScript,
  useGoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";

const useStyles = makeStyles({
  mobileOnlyMapStyles: {
    flexGrow: 1,
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
  const mapRef = React.useRef(null);
  const prevCenter = usePrevious(center);

  const handleMonumentMarkerClick = (monument) => {
    // if (canClickMarker.current) {
    //   onMonumentSelected(monument);
    // } else {
    //   closePopups();
    // }
  };

  const handleChangeCenter = ({ lat, lng }) => {
    changeCenter({
      lat: lat + 0.0000001, //Костыль
      lng: lng + 0.0000001, //Костыль
    });
  };

  const mapStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  useEffect(() => {
    if (
      typeof prevCenter !== "undefined" &&
      prevCenter.lat === center.lat &&
      prevCenter.lng === center.lng
    ) {
      handleChangeCenter(center);
    }
  }, [center]);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyB4nR9f1DNEJ8Cwze3ZRSQU4wCosKVtI6s"
      mapIds={["9ca280824ef8f1b9"]}
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        center={center}
        zoom={defaultZoom}
        options={{
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: true,
          scaleControl: true,
          mapTypeControl: false,
          mapId: "9ca280824ef8f1b9",
        }}
      >
        {monuments.map((p) => (
          <MonumentMarker monument={p} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

const mapStateToProps = ({ monument: { monuments }, map: { center } }) => ({
  monuments,
  center,
});

const mapDispatchToProps = { changeCenter };
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Map));
