import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';
import AppContext from "../../../../context/app-context";
import SimpleDetailYear from "../../../detail-drawer/detail-year/simple-detail-year";

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
          <CloseIcon style={{ color: "white" }} />
        </IconButton>
        <div style={{width: "85%"}}>
          <Typography variant="subtitle2" className={classes.monumentsName}>
            { name } 
          </Typography>
          <Typography variant="subtitle2" className={classes.title} style={{textOverflow: "ellipsis"}}>
            {monumentPhoto ? (
              <SimpleDetailYear
                year={monumentPhoto.year}
                period={monumentPhoto.period}
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
