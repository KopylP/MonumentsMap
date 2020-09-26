import React from "react";
import Period from "../../../models/period";

export default function DetailDestroyYear({ year, period }) {
  let dateText;
  switch (period) {
    case Period.Year:
      dateText = `${year} р.`;
      break;
    case Period.Decades:
      dateText = `${year % 100} р. ${+("" + year).slice(0, 2) + 1} ст.`;
      break;
    default:
      dateText = `${year} ст.`;
  }
  return <span>{dateText}</span>;
}
