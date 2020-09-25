import React from "react";

export default function SourceItem({ title, sourceLink }) {
  const sourceView = sourceLink ? <a href={sourceLink} target="_blank">{title}</a> : title;
  return <li style={{ fontSize: 14, wordWrap: "break-word" }}>{sourceView}</li>;
}
