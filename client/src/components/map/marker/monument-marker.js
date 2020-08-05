import React, { useContext, useEffect, useRef, useState, Component } from "react";
import { Marker, Popup } from "react-leaflet";
import markerIcon from "./marker-icon";
import AppContext from "../../../context/app-context";
import { popup } from "leaflet";
import { usePrevious } from "../../../hooks/hooks";
import MapContext from "../../../context/map-context";

export default class MonumentMarker extends Component {

  markerRef = React.createRef();

  getLatLng = () => {
    this.markerRef.current.leafletElement.getLatLng();
  }

  render() {
    const { monument, onClick = (p) => p } = this.props;
    let markerColor;
    // const { mapSelectedMonumentId } = useContext(MapContext);
    // const prevMapSelectedMonumentId = usePrevious(mapSelectedMonumentId);
  
    
  
    // useEffect(() => {
    //   if (
    //     mapSelectedMonumentId != null &&
    //     mapSelectedMonumentId !== prevMapSelectedMonumentId &&
    //     mapSelectedMonumentId.id === monument.id
    //   ) {
    //     markerRef.current.leafletElement.openPopup();
    //   }
    // }, [mapSelectedMonumentId]);
  
    switch (monument.condition.abbreviation) {
      case "good-condition":
        markerColor = "green";
        break;
      case "lost":
        markerColor = "red";
        break;
      case "lost-recently":
        markerColor = "red";
        break;
      case "verge-of-loss":
        markerColor = "orange";
        break;
      case "needs-repair":
        markerColor = "orange";
        break;
      default:
        markerColor = "green";
    }
  
    return (
      <Marker
        onclick={(e) => onClick(monument.id)}
        icon={markerIcon(markerColor)}
        position={{
          lat: monument.latitude,
          lng: monument.longitude,
        }}
        ref={this.markerRef}
      >
        <Popup autoPan={false}>{monument.name}</Popup>
      </Marker>
    );
  }
}
