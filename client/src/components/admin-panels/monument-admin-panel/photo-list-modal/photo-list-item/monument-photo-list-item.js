import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AppContext from "../../../../../context/app-context";
import {
  Grid,
  Switch,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
} from "@material-ui/core";
import PhotoYear from "../../../../common/photo-year/photo-year";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function MonumentPhotoListItem({
  monumentPhoto,
  style = {},
  className = {},
  setMonumentMajorPhotoByIndex = (p) => p,
  index,
  onDelete = p => p,
  onEdit = p => p
}) {
  const {
    monumentService: { getPhotoLink },
  } = useContext(AppContext);

  const classes = useStyles();
  return (
    <Card className={[classes.root, className]} style={style} onClick={e => {e.stopPropagation();}}>
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        height="240"
        image={getPhotoLink(monumentPhoto.photoId, 500)}
        title="Contemplative Reptile"
      />
      <List style={{ width: "100%" }}>
        <ListItem disableGutters={false} divider>
          <ListItemText id="switch-major-photo-label" primary="Головне фото" />
          <ListItemSecondaryAction>
            <Switch
              checked={monumentPhoto.majorPhoto}
              onChange={() =>
                setMonumentMajorPhotoByIndex(index, !monumentPhoto.majorPhoto)
              }
              inputProps={{ "aria-labelledby": "switch-major-photo-label" }}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <CardContent>
        <Typography gutterBottom variant="subtitle2">
          <PhotoYear year={monumentPhoto.year} period={monumentPhoto.period} />
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" noWrap>
          {monumentPhoto.description || "Немає опису"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => onEdit(monumentPhoto.id)}>
          Редагувати
        </Button>
        <Button size="small" style={{ color: "red" }} onClick={() => onDelete(index)}>
          Видалити
        </Button>
      </CardActions>
    </Card>
  );
}
