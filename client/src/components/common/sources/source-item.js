import { Typography } from "@material-ui/core";
import React from "react";

export default function SourceItem({ title, sourceLink }) {
  const sourceView = sourceLink ? <a href={sourceLink} target="_blank">{title}</a> : title;
  return <li><Typography variant="body2">{sourceView}</Typography></li>;
}
