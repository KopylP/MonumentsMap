import React, { useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LocalStorageService from "../../../services/local-storage-service";
import AdminContext from "../../context/admin-context";

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${theme.adminDrawerWidth}px)`,
    marginLeft: theme.adminDrawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  whiteColor: {
    color: "white",
  },
}));

function AdminAppBar({ drawerOpen, onMenuClick, title }) {
  const classes = useStyles();
  const history = useHistory();
  const { rightHeader } = useContext(AdminContext);

  const handleSignOut = () => {
    const lss = LocalStorageService.getService();
    lss.clearToken();
    history.push("/admin/login");
  };

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: drawerOpen,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onMenuClick}
          edge="start"
          className={clsx(classes.menuButton, drawerOpen && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {rightHeader}
        <Button color="inherit" onClick={handleSignOut}>
          Sign out
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default React.memo(AdminAppBar);
