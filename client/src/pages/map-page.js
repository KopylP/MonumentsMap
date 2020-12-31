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
import { changeMonument } from "../actions/detail-monument-actions";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    position: "fixed",
    left: 15,
    top: 15,
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

function MapPage({
  monuments,
  fetchMonuments,
  error,
  statuses,
  conditions,
  cities,
  yearsRange,
  changeMonument,
}) {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { selectedLanguage } = useContext(AppContext);

  const prevSelectedLanguage = usePrevious(selectedLanguage);
  const prevSelectedConditions = usePrevious(conditions);
  const prevSelectedCities = usePrevious(cities);
  const prevSelectedStatuses = usePrevious(statuses);
  const prevSelectedYearRange = usePrevious(yearsRange);
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
    fetchMonuments(cities, statuses, conditions, yearsRange);
  };

  const handleSelectLanguage = () => {
    update();
  };

  useEffect(() => {
    doIfArraysNotEqual(prevSelectedConditions, conditions)(update);
    doIfArraysNotEqual(prevSelectedStatuses, statuses)(update);
    doIfArraysNotEqual(prevSelectedCities, cities, (p) => p.id)(update);
    doIfArraysNotEqual(prevSelectedYearRange, yearsRange)(update);
    doIfNotTheSame(
      selectedLanguage,
      prevSelectedLanguage,
      (p) => p.code
    )(handleSelectLanguage);
  }, [conditions, cities, statuses, selectedLanguage, yearsRange]);

  useEffect(() => {
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
          changeMonument(
            monuments.find((p) => p.id === monumentId),
            false
          )
        }
      />
      <MenuButton className={classes.menuButton} />
      <MainDrawer />
      {/* <DetailDrawer /> */}
      {/* <MyLocation /> */}
    </div>
  );
}

const mapStateToProps = ({
  monument: { monuments, error },
  filter: { statuses, conditions, cities, yearsRange },
}) => ({
  monuments,
  error,
  statuses,
  conditions,
  cities,
  yearsRange,
});

const mapDispatchToProps = (dispatch, { monumentService }) => {
  return bindActionCreators(
    {
      fetchMonuments: fetchMonuments(monumentService),
      changeMonument: changeMonument(),
    },
    dispatch
  );
};
export default withMonumentService()(
  connect(mapStateToProps, mapDispatchToProps)(MapPage)
);
