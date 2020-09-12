import React, { useContext } from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PhotoYear from "../../../common/photo-year/photo-year";
import AppContext from "../../../../context/app-context";

const useStyles = makeStyles((theme) => ({
  backButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "white",
  },
  monumentsName: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "100%",
    display: "block"
  }
}));

export default function PhotoDrawerContentTitle({
  monumentPhoto,
  onBack = (p) => p,
}) {
  const classes = useStyles();
  const { selectedMonument : { name } } = useContext(AppContext);
  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.backButton}
          color="inherit"
          onClick={onBack}
        >
          <ArrowBackIcon style={{ color: "white" }} />
        </IconButton>
        <div style={{width: "85%"}}>
          <Typography variant="subtitle2" className={classes.monumentsName}>
            { name } 
          </Typography>
          <Typography variant="subtitle2" className={classes.title} style={{textOverflow: "ellipsis"}}>
            {monumentPhoto ? (
              <PhotoYear
                year={monumentPhoto && monumentPhoto.year}
                period={monumentPhoto && monumentPhoto.period}
              />
            ) : (
              "..."
            )}
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}
