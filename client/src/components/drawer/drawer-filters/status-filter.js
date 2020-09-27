import React, { useContext } from "react";
import AppContext from "../../../context/app-context";
import DefaultFilter from "./default-filter";
import { useTranslation } from "react-i18next";

export default function StatusFilter() {
  const {
    monumentService: { getAllStatuses },
    selectedStatuses,
    setSelectedStatuses,
  } = useContext(AppContext);

  const { t } = useTranslation();

  return (
    <DefaultFilter
      title={t("Monument status")}
      selectedValues={selectedStatuses}
      setSelectedValues={setSelectedStatuses}
      multiple
      getDataMethod={getAllStatuses}
    />
  );
}
