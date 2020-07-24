import React from "react";

export default function PhotoYear({year, period, ...props}) {
  let dateText;
  switch(period) {
    case 0: //century
      dateText = `${year} століття`;
      break;
    case 1: //year
      dateText = `${year} рік`;
      break;
    case 2: //decade
      dateText = `${year % 100} роки ${+('' + year).slice(0, 2) + 1} століття`;
      break;
  }

  return (
    <React.Fragment>{ dateText }</React.Fragment>
  );
}