import React, { useContext } from "react";
import { LinearProgress, makeStyles } from "@material-ui/core";

import { Grid } from "@material-ui/core";
import SelectLanguage from "../../select-language/select-language";
import AppContext from "../../../context/app-context";
import SearchableMainMonumentList from "./main-monument-list/searchable-main-monument-list";
import StatusFilter from "../drawer-filters/status-filter";
import ConditionFilter from "../drawer-filters/condition-filter";
import CityFilter from "../drawer-filters/city-filter";
import YearFilter from "../drawer-filters/year-filter/year-filter";
// import MonumentIcons from "../monument-icons/monument-icons";
import { isMobileOnly } from "react-device-detect";

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
  },
});

export default function DrawerContent(props) {
  const { monuments, loadingMonuments } = useContext(AppContext);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {loadingMonuments && (
        <LinearProgress className={classes.loadingIndicatior} color="secondary"/>
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
      </Grid>
      {!isMobileOnly && <SearchableMainMonumentList monuments={monuments} />}
    </div>
  );
}
