import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  IconButton,
  ListItemIcon,
  CardActionArea,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "react-perfect-scrollbar/dist/css/styles.css";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  listItemContainer: {
    maxWidth: 200,
    padding: 5
  },
}));

export default function MonumentListItem({
  monument,
  onAcceptedChange = (p) => p,
  index,
}) {
  const classes = useStyles();
  return (
    <ListItem>
      <ListItemIcon>
        <IconButton>
          <EditIcon />
        </IconButton>
      </ListItemIcon>
      <CardActionArea className={classes.listItemContainer}>
        <ListItemText>
          {monument.name}
        </ListItemText>
      </CardActionArea>
      <ListItemSecondaryAction>
        <Switch
          checked={monument.accepted}
          onChange={(_, checked) => onAcceptedChange(index, checked)}
        />
        <IconButton>
          <DeleteIcon edge="end" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
