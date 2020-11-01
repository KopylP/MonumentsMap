import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MainDrawer from "../components/drawer/main-drawer";
import AppContext from "../context/app-context";
import MenuButton from "../components/common/menu-button/menu-button";
import Map from "../components/map/map";
import DetailDrawer from "../components/detail-drawer/detail-drawer";
import { usePrevious } from "../hooks/hooks";
import {
  doIfNotTheSame,
  doIfArraysNotEqual,
} from "../components/helpers/conditions";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import MyLocation from "../components/map/my-location/my-location";
import { showErrorSnackbar } from "../components/helpers/snackbar-helpers";
import { connect } from "react-redux";
import { fetchMonuments } from "../actions/monument-actions";
import withMonumentService from "../components/hoc-helpers/with-monument-service";
import { bindActionCreators } from "redux";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    position: "fixed",
    left: 50,
    top: 10,
    zIndex: 999,
  },
  app: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    display: "flex",
  },
  mapContainer: {
    flexGrow: 1,
  },
}));

function MapPage({ monuments, fetchMonuments, error }) {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {
    selectedLanguage,
    selectedConditions,
    selectedCities,
    selectedStatuses,
    selectedYearRange,
    setMainDrawerOpen,
    handleMonumentSelected,
  } = useContext(AppContext);

  const prevSelectedLanguage = usePrevious(selectedLanguage);
  const prevSelectedConditions = usePrevious(selectedConditions);
  const prevSelectedCities = usePrevious(selectedCities);
  const prevSelectedStatuses = usePrevious(selectedStatuses);
  const prevSelectedYearRange = usePrevious(selectedYearRange);
  const prevMonuments = usePrevious(monuments);

  const { t } = useTranslation();


  const showSnackbar = (message) => {
    enqueueSnackbar(message, {
      variant: "info",
      anchorOrigin: { horizontal: "center", vertical: "bottom" },
      autoHideDuration: 1500,
    });
  };

  const update = () => {
    fetchMonuments(
      selectedCities,
      selectedStatuses,
      selectedConditions,
      selectedYearRange
    );
  };

  const handleSelectLanguage = () => {
    update();
  };

  useEffect(() => {
    doIfArraysNotEqual(prevSelectedConditions, selectedConditions)(update);
    doIfArraysNotEqual(prevSelectedStatuses, selectedStatuses)(update);
    doIfArraysNotEqual(prevSelectedCities, selectedCities, (p) => p.id)(update);
    doIfNotTheSame(
      selectedLanguage,
      prevSelectedLanguage,
      (p) => p.code
    )(handleSelectLanguage);
  }, [selectedConditions, selectedCities, selectedStatuses, selectedLanguage]);

  useEffect(() => {
    doIfArraysNotEqual(prevSelectedYearRange, selectedYearRange)(update);
  }, [selectedYearRange]);

  useEffect(() => {
    console.log("error", error);
    if (!error && prevMonuments && monuments.length === 0) {
      setTimeout(() => {
        showSnackbar(t("No monuments were found by such criteria"));
      }, 400);
    } else {
      closeSnackbar();
    }
  }, [monuments]);

  useEffect(() => {
    if (error) showErrorSnackbar(enqueueSnackbar, t("Network error"));
  }, [error]);

  return (
    <div
      className={classes.app}
      // style={{ visibility: firstLoading ? "hidden" : "visible" }}
    >
      <Map
        onMonumentSelected={(monumentId) =>
          handleMonumentSelected(
            monuments.find((p) => p.id === monumentId),
            false
          )
        }
      />
      <MenuButton
        className={classes.menuButton}
        onClick={() => setMainDrawerOpen(true)}
      />
      <MainDrawer />
      <DetailDrawer />
      <MyLocation />
    </div>
  );
}

const mapStateToProps = ({ monument: { monuments, error } }) => ({
  monuments,
  error,
});
const mapDispatchToProps = (dispatch, { monumentService }) => {
  return bindActionCreators(
    { fetchMonuments: fetchMonuments(monumentService) },
    dispatch
  );
};
export default withMonumentService()(
  connect(mapStateToProps, mapDispatchToProps)(MapPage)
);
