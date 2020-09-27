import React from "react";
import { makeStyles } from "@material-ui/core";
import Period from "../../../models/period";
import { useTranslation } from "react-i18next";
import { arabToRoman } from "roman-numbers";

const useStyles = makeStyles((theme) => ({
  container: {
    fontSize: 14,
    color: "#888",
  },
}));

export default function DetailYear({ year, period, textOnly = false }) {
  const styles = useStyles();
  const { t } = useTranslation();
  let dateText;
  switch (period) {
    case Period.StartOfCentury:
      dateText = t("Built in the early of century", { century: arabToRoman(year) });
      break;
    case Period.MiddleOfCentury:
      dateText = t("Built in the middle of the century", { century: arabToRoman(year) });
      break;
    case Period.EndOfCentury:
      dateText = t("Built in the late of century", { century: arabToRoman(year) });
      break;
    case Period.Year:
      dateText = t("Built in", { year });
      break;
    case Period.Decades:
      dateText = t("Built in the years of the century", {
        decade: year % 100,
        century: arabToRoman(+("" + year).slice(0, 2) + 1),
      });
      break;
  }

  return <div className={!textOnly ? styles.container : ""}>{dateText}</div>;
}
