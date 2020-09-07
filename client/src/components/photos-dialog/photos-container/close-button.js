import React from "react";
import { IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

const CloseButton = ({onClick = (p) => p}) => (
  <IconButton
    style={{
      position: "absolute",
      right: 10,
      top: 10,
      color: "white",
      zIndex: 999
    }}
    onClick={onClick}
  >
    <CloseIcon />
  </IconButton>
);

export default CloseButton;
