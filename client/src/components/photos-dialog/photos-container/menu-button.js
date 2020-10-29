import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";

const MenuButton = ({onClick = (p) => p}) => (
  <IconButton
    style={{
      position: "absolute",
      left: 10,
      top: 10,
      color: "white",
      zIndex: 999
    }}
    onClick={onClick}
  >
    <MenuIcon />
  </IconButton>
);

export default MenuButton;
