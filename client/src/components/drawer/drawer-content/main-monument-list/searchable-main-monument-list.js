import React, { useState } from "react";
import MainMonumentSearch from "./main-monument-search/main-monument-search";
import { Box } from "@material-ui/core";
import MainMonumentList from "./main-monument-list";
export default function SearchableMainMonumentList({ monuments = [] }) {

  const [searchValue, setSearchValue] = useState("");

  const filterFunction = ({ name }) => {
    return name.toLowerCase().includes(searchValue.toLowerCase());
  }

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  }

  const filteredMonuments = monuments.filter(filterFunction);

  return (
    <React.Fragment>
      <MainMonumentSearch value={searchValue} onChange={handleSearchValueChange}/>
      <Box
        component="div"
        display={{ xs: "none", sm: "block" }}
        style={{ width: "100%", flex: "1 1 auto", marginTop: 15 }}
      >
        <MainMonumentList data={filteredMonuments} />
      </Box>
    </React.Fragment>
  );
}
