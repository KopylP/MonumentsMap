import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

const CloseButton = ({onClick = (p) => p, style = {}}) => (
  <IconButton
    style={{
      ...style,
      color: "white",
      zIndex: 999
    }}
    onClick={onClick}
  >
    <CloseIcon />
  </IconButton>
);

export default CloseButton;
