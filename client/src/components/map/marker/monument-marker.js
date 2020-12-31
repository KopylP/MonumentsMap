import React, { Component } from "react";
import { Marker } from "@react-google-maps/api";
import IconPink from "./map-marker-alt-solid-pink.svg";
import IconRed from "./map-marker-alt-solid-red.svg";
import MonumentInfoWindow from "./monument-info-window/monument-info-window";
import { connect } from "react-redux";
import { changeMonument } from "../../../actions/detail-monument-actions";
import { bindActionCreators } from "redux";

class MonumentMarker extends Component {
  handleClick = () => {
    const { monument, changeMonument, selectedMonument } = this.props;
    changeMonument(monument, false);
    console.log("selected Monument", selectedMonument);
  };

  render() {
    const { monument, selectedMonument } = this.props;
    let markerIcon;

    switch (monument.condition.abbreviation) {
      case "good-condition":
      case "verge-of-loss":
      case "needs-repair":
        markerIcon = IconPink;
        break;
      case "lost":
      case "lost-recently":
        markerIcon = IconRed;
        break;
      default:
        markerIcon = IconPink;
    }

    const icon = {
      url: markerIcon,
      scaledSize: {
        width: 30,
        height: 30,
      },
    };

    const handleWindowClose = () => {
      console.log("CLOOOOOSE");
      changeMonument(null, false);
    };

    return (
      <Marker
        onClick={this.handleClick}
        icon={icon}
        position={{
          lat: monument.latitude,
          lng: monument.longitude,
        }}
      >
        {selectedMonument && selectedMonument.id === monument.id && (
          <MonumentInfoWindow {...monument} onWindowClose={handleWindowClose} />
        )}
      </Marker>
    );
  }
}

const bindStateToProps = ({ detailMonument: { selectedMonument } }) => ({
  selectedMonument,
});

const bindDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      changeMonument: changeMonument(),
    },
    dispatch
  );

export default connect(bindStateToProps, bindDispatchToProps)(MonumentMarker);
