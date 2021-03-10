import { Chip } from "@material-ui/core";
import React from "react";
import DoneIcon from '@material-ui/icons/Done';

export default function TagChip({ tag, checked, onClick }) {
  return (
    <Chip
      size="small"
      label={tag}
      clickable
      variant="outlined"
      color="secondary"
      icon={checked ? <DoneIcon />: null}
      onClick={onClick}
    />
  );
}
