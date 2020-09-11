import React, { useContext } from "react";
import { useTheme, Divider } from "@material-ui/core";

import { Grid } from "@material-ui/core";
import SelectLanguage from "../../select-language/select-language";
import AppContext from "../../../context/app-context";
import SearchableMainMonumentList from "./main-monument-list/searchable-main-monument-list";
import StatusFilter from "../drawer-filters/status-filter";
import ConditionFilter from "../drawer-filters/condition-filter";
import CityFilter from "../drawer-filters/city-filter";
import YearFilter from "../drawer-filters/year-filter/year-filter";
import MonumentIcons from "../monument-icons/monument-icons";

export default function DrawerContent(props) {
  const { monuments } = useContext(AppContext);

  const theme = useTheme();

  return (
    <div
      style={{
        flex: "1 1 auto",
        padding: 15,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
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
      <SearchableMainMonumentList monuments={monuments} />
    </div>
  );
}
