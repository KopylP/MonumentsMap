import { Dialog } from "@material-ui/core";
import React, { useState } from "react";
import SlideUpTransition from "../../../common/transitions/slide-up-transition";
import MobileMonumentList from "./mobile-monument-list";
import MobileMonumentsTitle from "./mobile-monuments-title";

export default function MobileMonumentsListDialog({ monuments, open, onBack }) {
  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = (value) => {
    setSearchValue(value);
  };
  const filterFunction = ({ name }) => {
    return name.toLowerCase().includes(searchValue.toLowerCase());
  };
  return (
    <Dialog fullScreen open={open} TransitionComponent={SlideUpTransition}>
      <MobileMonumentsTitle
        onBack={onBack}
        searchValue={searchValue}
        onSearchValueChange={handleSearchChange}
      />
      <MobileMonumentList monuments={monuments.filter(filterFunction)} />
    </Dialog>
  );
}
