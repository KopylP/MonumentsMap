import React from "react";
import Period from "../../../models/period";

export default function SimpleDetailYear({ year, period }) {
  let dateText;
  switch (period) {
    case Period.StartOfCentury:
      dateText = `Початок ${year}-го століття`;
      break;
    case Period.MiddleOfCentury:
      dateText = `Середина ${year}-го століття`;
      break;
    case Period.EndOfCentury:
      dateText = `Кінець ${year}-го століття`;
      break;
    case Period.Year:
      dateText = `${year}-й рік`;
      break;
    case Period.Decades:
      dateText = `${year % 100}-ті роки ${+("" + year).slice(0, 2) + 1} століття`;
      break;
  }

  return <div>{dateText}</div>;
}
