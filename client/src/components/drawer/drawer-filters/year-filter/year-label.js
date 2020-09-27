import React from "react";
import { Typography } from "@material-ui/core";

const YearLabel = ({ year }) => (
  <Typography
    variant="subtitle2"
    gutterBottom
    style={{ padding: 0, margin: 0 }}
  >
    {year}
  </Typography>
);

export default YearLabel;
