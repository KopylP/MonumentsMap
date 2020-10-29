import React from "react";
import IconButton from "@material-ui/core/IconButton";
import GetAppIcon from '@material-ui/icons/GetApp';

const SaveButton = ({onClick = (p) => p, style = {}}) => (
  <IconButton
    style={{
      ...style,
      color: "white",
      zIndex: 999
    }}
    onClick={onClick}
  >
    <GetAppIcon />
  </IconButton>
);

export default SaveButton;
