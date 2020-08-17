import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PhotoYear from "../../../common/photo-year/photo-year";

const useStyles = makeStyles((theme) => ({
  backButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "white",
  },
}));

export default function PhotoDrawerContentTitle({ monumentPhoto, onBack = p => p }) {
  const classes = useStyles();
  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <IconButton edge="start" className={classes.backButton} color="inherit" onClick={onBack}>
          <ArrowBackIcon style={{ color: "white" }} />
        </IconButton>
        <Typography variant="h7" className={classes.title}>
          {monumentPhoto ? (
            <PhotoYear
              year={monumentPhoto && monumentPhoto.year}
              period={monumentPhoto && monumentPhoto.period}
            />
          ) : (
            "..."
          )}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
