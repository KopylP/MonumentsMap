import React, { Component } from "react";
import { Marker, Popup } from "react-leaflet";
import markerIcon from "./marker-icon";

export default class MonumentMarker extends Component {

  markerRef = React.createRef();

  getLatLng = () => {
    this.markerRef.current.leafletElement.getLatLng();
  }

  render() {
    const { monument, onClick = (p) => p } = this.props;
    let markerColor;
  
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
