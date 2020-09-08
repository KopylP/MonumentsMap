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
    if (culture !== null) {
      setSelectedLanguage(culture);
    }
    setAnchorEl(null);
  };

  const menuItems = supportedCultures.map((culture, i) => (
    <MenuItem key={i} onClick={() => handleMenuClose(culture)}>{culture.name}</MenuItem>
  ));

  return (
    <React.Fragment>
      <Button
        color="secondary"
        aria-haspopup="true"
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
    </React.Fragment>
  );
}
