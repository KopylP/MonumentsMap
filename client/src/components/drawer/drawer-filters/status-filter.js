import React, { useContext } from "react";
import AppContext from "../../../context/app-context";
import DefaultFilter from "./default-filter";

export default function StatusFilter() {
  const {
    monumentService: { getAllStatuses },
    selectedStatuses,
    setSelectedStatuses,
  } = useContext(AppContext);

  return (
    <DefaultFilter
      title="Статус пам'ятки"
      selectedValues={selectedStatuses}
      setSelectedValues={setSelectedStatuses}
      multiple
      getDataMethod={getAllStatuses}
    />
  );
}
