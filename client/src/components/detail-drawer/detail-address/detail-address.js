import React, { useContext, useEffect, useState } from "react";
import Grid  from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import RoomIcon from "@material-ui/icons/Room";
import AppContext from "../../../context/app-context";
import WithLoadingData from "../../hoc-helpers/with-loading-data";
import useCancelablePromise from "@rodw95/use-cancelable-promise";
import DrawerAnimContentLoader from "../drawer-anim-content-loader/drawer-anim-content-loader";

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

function DetailAddress({ data, ...props }) {
  const styles = useStyles(props);
  const [address, setAddress] = useState(null);
  const {
    geocoderService: { getAddressInformationFromLatLng },
  } = useContext(AppContext);
  const makeCancelable = useCancelablePromise();

  const handleDataChange = () => {
    if (data != null) {
      makeCancelable(getAddressInformationFromLatLng(data.lat, data.lng)).then(
        ({ address }) => {
          setAddress(address);
        }
      );
    } else {
      setAddress(null);
    }
  };

  useEffect(handleDataChange, [data]);

  return (
    <React.Fragment>
      {address != null ? (
        <Grid item>
          <div className={styles.container}>
            <RoomIcon className={styles.locationIcon} />
            <div className={styles.address}>
              {address.city}, {address.road}, {address.house_number}
            </div>
          </div>
        </Grid>
      ) : (
        <LoadingComponent />
      )}
    </React.Fragment>
  );
}

export default WithLoadingData(DetailAddress)(() => <LoadingComponent />);

const LoadingComponent = () => (
  <DrawerAnimContentLoader height="18">
    <rect x="0" y="0" rx="5" ry="5" width="200" height="10" />
  </DrawerAnimContentLoader>
);
