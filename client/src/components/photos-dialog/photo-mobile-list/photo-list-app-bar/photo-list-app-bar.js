import { AppBar, IconButton, Toolbar, Typography, makeStyles } from "@material-ui/core";
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
