import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import getLocation from "../../helpers/get-location";
import React, { useContext } from "react";
import AppContext from "../../../context/app-context";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  iconColor: { color: theme.palette.primary.main },
  root: {
    position: "absolute",
    bottom: 25,
    right: 10,
    zIndex: 999,
    pointerEvents: "auto",
  },
  button: {
    backgroundColor: "white",
    "&:hover": {
        backgroundColor: "#eee"
    },
    borderRadius: "50%",
  },
}));

export default function MyLocation() {
  const { setCenter } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const handleGetLocation = (location) => {
    setCenter({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  function showError(error) {
    let errorText = "";
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorText = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        errorText = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        errorText = "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        errorText = "An unknown error occurred.";
        break;
    }
    enqueueSnackbar(errorText, { variant: "error", autoHideDuration: 1500 });
  }

  const handleButtonClick = () => {
    getLocation().then(handleGetLocation).catch(showError);
  };

  return (
    <div className={classes.root}>
      <IconButton onClick={handleButtonClick} className={classes.button}>
        <MyLocationIcon className={classes.iconColor} />
      </IconButton>
    </div>
  );
}
