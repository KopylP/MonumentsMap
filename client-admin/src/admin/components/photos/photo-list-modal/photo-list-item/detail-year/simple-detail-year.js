import React from "react";
import { arabToRoman } from "roman-numbers";
import { useTranslation } from "react-i18next";
import Period from "../../../../../../models/period";

export default function SimpleDetailYear({ year, period }) {
  const { t } = useTranslation();

  let dateText;
  switch (period) {
    case Period.StartOfCentury:
      dateText = `Early of ${arabToRoman(year)} century`;
      break;
    case Period.MiddleOfCentury:
      dateText = `Middle of ${arabToRoman(year)} the century`;
      break;
    case Period.EndOfCentury:
      dateText = `End of the ${arabToRoman(year)} century`;
      break;
    case Period.Year:
      dateText = year;
      break;
    case Period.Decades:
      dateText = `${ year % 100} years of the ${arabToRoman(+('' + year).slice(0, 2) + 1)} century`;
      break;
    default:
      dateText = "";
      break;
  }

  return <span>{dateText}</span>;
}
