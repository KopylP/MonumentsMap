import React, { useState } from "react";
import GoogleMapReact from "google-map-react";

const defaultProps = {
  //map
  center: {
    lat: 49.60,
    lng: 34.54,
  },
  zoom: 12,
};

export default function Map(props) {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: "AIzaSyDTjU-QE2HsjmJsveLmcmtVfI2CpUppW6Q",
      }}
      defaultCenter={defaultProps.center}
      defaultZoom={defaultProps.zoom}
    ></GoogleMapReact>
  );
}
asdfasdfasdf