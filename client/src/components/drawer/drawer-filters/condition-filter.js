import React, { useContext } from "react";
import AppContext from "../../../context/app-context";
import DefaultFilter from "./default-filter";

export default function ConditionFilter() {
  const {
    monumentService: { getAllConditions },
    selectedConditions,
    setSelectedConditions,
  } = useContext(AppContext);

  return (
    <DefaultFilter
      title="Стан пам'ятки архітектури"
      selectedValues={selectedConditions}
      setSelectedValues={setSelectedConditions}
      multiple
      getDataMethod={getAllConditions}
    />
  );
}
