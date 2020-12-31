import React from "react";
import { InfoWindow } from "@react-google-maps/api";
import "./monument-info-window.css";
export default function MonumentInfoWindow(props) {
  const { name, majorPhotoImageId, onWindowClose } = props;
  return (
    <InfoWindow {...props} onCloseClick={onWindowClose}>
      <div>{name}</div>
    </InfoWindow>
  );
}
