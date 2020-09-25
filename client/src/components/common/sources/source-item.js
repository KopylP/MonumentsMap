import { Typography } from "@material-ui/core";
import React from "react";

export default function SourceItem({ title, sourceLink }) {
  const sourceView = sourceLink ? <a href={sourceLink} target="_blank">{title}</a> : title;
  return <li style={{ fontSize: 14 }}>{sourceView}</li>;
}
