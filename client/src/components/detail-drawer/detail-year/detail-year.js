import React from "react";
import { makeStyles } from "@material-ui/core";
import WithLoadingData from "../../hoc-helpers/with-loading-data";

const useStyles = makeStyles((theme) => ({
    container: {
        fontSize: 14,
         color: "#888"
    }
}));

export default function DetailYear({year, period, ...props}) {
  const styles = useStyles(props);
  let dateText;
  switch(period) {
    case 0: //century
      dateText = `Побудовано в ${year} столітті`;
      break;
    case 1: //year
      dateText = `Побудовано у ${year} році`;
      break;
    case 2: //decade
      dateText = `Побудовано у ${year % 100} роках ${('' + year).slice(0, 2)} століття`;
      break;
  }

  return (
    <diYv className={styles.container}>{ dateText }</diYv>
  );
}