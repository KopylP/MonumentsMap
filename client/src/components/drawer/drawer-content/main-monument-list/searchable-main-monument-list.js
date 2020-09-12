import React from "react";
import MainMonumentSearch from "./main-monument-search/main-monument-search";
import { Box } from "@material-ui/core";
import MainMonumentList from "./main-monument-list";
export default function SearchableMainMonumentList({ monuments = [] }) {

  return (
    <React.Fragment>
      <MainMonumentSearch />
      <Box
        component="div"
        display={{ xs: "none", sm: "block" }}
        style={{ width: "100%", flex: "1 1 auto", marginTop: 15 }}
      >
        <MainMonumentList data={monuments} />
      </Box>
    </React.Fragment>
  );
}
