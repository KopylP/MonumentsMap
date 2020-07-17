import React, { useContext, useEffect, useState } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import RoomIcon from "@material-ui/icons/Room";
import GeocoderService from "../../../services/geocoder-service";
import ContentLoader from 'react-content-loader';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  locationIcon: {
    margin: -5,
    color: "#624CAB",
  },
  address: {
    marginLeft: 7,
    fontSize: 14,
  },
}));

export default function DetailAddress({ data, ...props }) {
  const styles = useStyles(props);
  const [address, setAddress] = useState(null);
  const geocoderService = new GeocoderService();

  useEffect(() => {
    if (data != null) {
      console.log(data);
      geocoderService
        .getAddressInformationFromLatLng(data.lat, data.lng)
        .then(({ address }) => {
          setAddress(address);
          console.log(address);
        });
    }
  }, [data]);

  return (
    <React.Fragment>
      {address != null ? (
        <Grid item justify="space-between">
          <div className={styles.container}>
            <RoomIcon className={styles.locationIcon} />
            <div className={styles.address}>
              {address.city}, {address.road}, {address.house_number}
            </div>
          </div>
        </Grid>
      ) : (
        <ContentLoader height="18">
          <rect x="0" y="0" rx="5" ry="5" width="200" height="10" />
        </ContentLoader>
      )}
    </React.Fragment>
  );
}
