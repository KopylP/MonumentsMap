import React from "react";
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

const useStyles = makeStyles((theme) => ({
  listItemText: {
    maxWidth: 240,
  },
}));

export default function MonumentListItem({ monument, onAcceptedChange = p => p, index }) {
  const classes = useStyles();
  return (
    <ListItem button>
      <ListItemText className={classes.listItemText}>{ monument.name }</ListItemText>
      <ListItemSecondaryAction>
        <Switch checked={ monument.accepted } onChange={(_, checked) => onAcceptedChange(index, checked)}/>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
