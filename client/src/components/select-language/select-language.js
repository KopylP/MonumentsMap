import React, { useContext } from "react";
import { makeStyles, Menu, MenuItem } from "@material-ui/core";

import { Button } from "@material-ui/core";
import TranslateIcon from "@material-ui/icons/Translate";
import { supportedCultures } from "../../config";
import AppContext from "../../context/app-context";

export default function SelectLanguage(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { selectedLanguage, setSelectedLanguage } = useContext(AppContext);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (culture = null) => {
    console.log(culture);
    if (culture !== null) {
        console.log("culture", culture);
      setSelectedLanguage(culture);
    }
    setAnchorEl(null);
  };

  const menuItems = supportedCultures.map((culture) => (
    <MenuItem onClick={() => handleMenuClose(culture)}>{culture.name}</MenuItem>
  ));

  return (
    <div style={{ float: "right" }}>
      <Button
        color="secondary"
        aria-haspopup="true"
        keepMounted
        startIcon={<TranslateIcon />}
        aria-controls="language-menu"
        onClick={handleMenuClick}
      >
        {selectedLanguage.name}
      </Button>
      <Menu
        id="language-menu"
        open={Boolean(anchorEl)}
        onClose={() => handleMenuClose()}
        keepMounted
        anchorEl={anchorEl}
      >
        {menuItems}
      </Menu>
    </div>
  );
}
