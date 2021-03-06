import React from "react";
import Period from "../../../models/period";
import { arabToRoman } from "roman-numbers";
import { useTranslation } from "react-i18next";

export default function DetailDestroyYear({ year, period }) {

  const { t } = useTranslation();

  let dateText;
  switch (period) {
    case Period.Year:
      dateText = t("simple year", { year });
      break;
    case Period.Decades:
      dateText = t("Years of the century", {
        decade: year % 100,
        century: arabToRoman(+("" + year).slice(0, 2) + 1),
      });
      break;
    default:
      dateText = `${arabToRoman(year)}`;
  }
  return <span>{dateText}</span>;
}
