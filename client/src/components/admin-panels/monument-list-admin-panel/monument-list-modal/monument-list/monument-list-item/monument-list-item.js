import React, { useContext } from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "react-perfect-scrollbar/dist/css/styles.css";
import DeleteIcon from "@material-ui/icons/Delete";
import AppContext from "../../../../../../context/app-context";

const useStyles = makeStyles((theme) => ({
  listItemText: {
    maxWidth: 240,
  },
}));

export default function MonumentListItem({ monument }) {
  const classes = useStyles();
  const { monumentService } = useContext(AppContext);
  return (
    <ListItem button>
      <ListItemText className={classes.listItemText}>{ monument.name }</ListItemText>
      <ListItemSecondaryAction>
        <Switch checked={ monument.accepted } />
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
