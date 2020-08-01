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
import DetailYear from "../../../../detail-drawer/detail-year/detail-year";

export default function MainMonumentListItem({ monument }) {
  const { monumentService } = useContext(AppContext);

  return (
    <div>
      <ListItem disableGutters button>
        <ListItemAvatar>
          {monument.majorPhotoImageId ? (
            <Avatar
              src={monumentService.getPhotoLink(monument.majorPhotoImageId)}
              alt={"photo"}
            />
          ) : null}
        </ListItemAvatar>
        <ListItemText
          primary={<Typography noWrap>{monument.name}</Typography>}
          secondary={<DetailYear year={monument.year} period={monument.period} textOnly/>}
        />
      </ListItem>
      <Divider />
    </div>
  );
}
