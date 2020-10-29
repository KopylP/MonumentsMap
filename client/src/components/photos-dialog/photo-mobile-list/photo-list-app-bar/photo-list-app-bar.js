import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';
import React from "react";

const useStyles = makeStyles((theme) => ({
  backButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function PhotoListAppBar({ name, onBackButtonClick = p => p }) {
  const classes = useStyles();

  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.backButton}
          color="inherit"
          onClick={onBackButtonClick}
        >
          <CloseIcon style={{ color: "white" }} />
        </IconButton>
        <Typography variant="subtitle1" className={classes.monumentName}>
          {name}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
