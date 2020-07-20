import React, { useState, useEffect, useContext } from "react";
import { Map as LeafMap, TileLayer, Marker, Popup } from "react-leaflet";
import AppContext from "../../context/app-context";
import MonumentMarker from "./marker/monument-marker";

const center = {
  lat: -3.745,
  lng: -38.523,
};

function Map({onMonumentSelected = p => p}) {
  const { monumentService } = useContext(AppContext);
  const [monuments, setMonuments] = useState([]);

  useEffect(() => {
    monumentService.getAllMonuments()
      .then(monuments => setMonuments(monuments));
  }, []);


  const markers = monuments.length > 0 ? monuments.map((monument, i) => {
    return <MonumentMarker onClick={onMonumentSelected} monument={monument} key={i}/>;
  }) : null;

  return (
    <LeafMap
      center={center}
      zoom={12}
      style={{ width: "100%", height: "100vh" }}
      // key={monuments.length}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers}
    </LeafMap>
  );
}

export default React.memo(Map);
