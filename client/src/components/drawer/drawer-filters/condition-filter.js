import React, { useContext } from "react";
import AppContext from "../../../context/app-context";
import DefaultFilter from "./default-filter";
import { useTranslation } from "react-i18next";

export default function ConditionFilter() {
  const {
    monumentService: { getAllConditions },
    selectedConditions,
    setSelectedConditions,
  } = useContext(AppContext);

  const { t } = useTranslation();

  return (
    <DefaultFilter
      title={t('Monument condition')}
      selectedValues={selectedConditions}
      setSelectedValues={setSelectedConditions}
      multiple
      getDataMethod={getAllConditions}
    />
  );
}
