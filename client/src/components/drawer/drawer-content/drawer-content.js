import React, { useContext } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SelectLanguage from "../../select-language/select-language";
import AppContext from "../../../context/app-context";
import SearchableMainMonumentList from "./main-monument-list/searchable-main-monument-list";
import StatusFilter from "../drawer-filters/status-filter";
import ConditionFilter from "../drawer-filters/condition-filter";
import CityFilter from "../drawer-filters/city-filter";
import YearFilter from "../drawer-filters/year-filter/year-filter";
// import MonumentIcons from "../monument-icons/monument-icons";
import { isMobileOnly } from "react-device-detect";
import MobileMonumentContainer from "./mobile-monuments-list/mobile-monument-container";
import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    flex: "1 1 auto",
    padding: 15,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    position: "relative",
  },
  loadingIndicatior: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    height: 4,
  },
});

function DrawerContent({ monumentsLoading, monuments }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {monumentsLoading && (
        <LinearProgress
          className={classes.loadingIndicatior}
          color="secondary"
        />
      )}
      <Grid container justify="flex-start" spacing={2}>
        <Grid item xs={12}>
          <SelectLanguage />
        </Grid>
        {/* <MonumentIcons /> */}
        <YearFilter />
        <CityFilter />
        <StatusFilter />
        <ConditionFilter />
        {isMobileOnly && <MobileMonumentContainer monuments={monuments} />}
      </Grid>
      {!isMobileOnly && <SearchableMainMonumentList monuments={monuments} />}
    </div>
  );
}

const bindStateToProps = ({ monument: { monuments, loading } }) => ({
  monuments,
  monumentsLoading: loading,
});
export default connect(bindStateToProps)(DrawerContent);
