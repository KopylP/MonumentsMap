import React, { useState } from "react";
import { googleMapsKey } from "../../config";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const center = {
  lat: -3.745,
  lng: -38.523
};

function Map(props) {
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const containerStyle = {
    width: '100%',
    height: '100%'
  };
   

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
      <LoadScript googleMapsApiKey={googleMapsKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{ styles: [{ elementType: "labels", featureType: "poi.business", stylers: [{ visibility: "off", }], }], }}
        ><Marker position={center} >
          </Marker></GoogleMap>
      </LoadScript>
  );
}

export default React.memo(Map);