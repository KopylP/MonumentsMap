import React from "react";
import Period from "../../../models/period";

export default function PhotoYear({ year, period, ...props }) {
  let dateText;
  switch (period) {
    case Period.StartOfCentury:
      dateText = `Початок ${year} століття`;
      break;
    case Period.MiddleOfCentury:
      dateText = `Середина ${year} століття`;
      break;
    case Period.EndOfCentury:
      dateText = `Кінець ${year} століття`;
      break;
    case Period.Year:
      dateText = `${year} рік`;
      break;
    case Period.Decades:
      dateText = `${year % 100} роки ${+("" + year).slice(0, 2) + 1} століття`;
      break;
  }

  return <React.Fragment>{dateText}</React.Fragment>;
}
