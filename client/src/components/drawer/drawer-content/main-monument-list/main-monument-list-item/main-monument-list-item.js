import React, { useContext } from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Typography,
} from "@material-ui/core";
import AppContext from "../../../../../context/app-context";
import SimpleDetailYear from "../../../../detail-drawer/detail-year/simple-detail-year";

export default function MainMonumentListItem({ monument, style, onClick = p => p }) {
  const { monumentService } = useContext(AppContext);

  return (
    <div style={style}>
      <ListItem disableGutters button onClick={onClick}>
        <ListItemAvatar>
          {monument.majorPhotoImageId ? (
            <Avatar
              src={monumentService.getPhotoLink(monument.majorPhotoImageId, 100)}
              alt={"photo"}
            />
          ) : null}
        </ListItemAvatar>
        <ListItemText
          primary={<Typography noWrap>{monument.name}</Typography>}
          secondary={<SimpleDetailYear year={monument.year} period={monument.period}/>}
        />
      </ListItem>
      <Divider />
    </div>
  );
}
