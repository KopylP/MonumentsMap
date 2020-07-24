import React from "react";
import { makeStyles } from "@material-ui/core";
import WithLoadingData from "../../hoc-helpers/with-loading-data";
import Period from "../../../models/period";

const useStyles = makeStyles((theme) => ({
  container: {
    fontSize: 14,
    color: "#888",
  },
}));

export default function DetailYear({ year, period, ...props }) {
  const styles = useStyles(props);
  let dateText;
  switch (period) {
    case Period.StartOfCentury:
      dateText = `Побудовано на початок ${year}-го століття`;
      break;
    case Period.MiddleOfCentury:
      dateText = `Побудовано в середині ${year}-го століття`;
      break;
    case Period.EndOfCentury:
      dateText = `Побудовано в кінці ${year}-го століття`;
      break;
    case Period.Year:
      dateText = `Побудовано у ${year}-му році`;
      break;
    case Period.Decades:
      dateText = `Побудовано у ${year % 100}-х роках ${+("" + year).slice(0, 2) + 1} століття`;
      break;
  }

  return <div className={styles.container}>{dateText}</div>;
}
