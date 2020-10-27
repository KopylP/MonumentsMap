import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AppContext from "../../../../context/app-context";

const useStyles = makeStyles({
  root: {
    // WebkitBoxShadow: "10px 10px 18px -10px rgba(125,125,125,1)",
    // MozBoxShadow: "10px 10px 18px -10px rgba(125,125,125,1)",
    // boxShadow: "10px 10px 18px -10px rgba(125,125,125,1)",
    marginBottom: 15,
    boxSizing: "border-box",
    border: "1px solid #ccc",
  },
  media: {
    height: 140,
  },
});

export default function MobileMonumentCard({
  monument: { name, majorPhotoImageId },
  style,
  onClick
}) {
  const classes = useStyles();
  const {
    monumentService: { getPhotoLink },
  } = useContext(AppContext);

  return (
    <div
      style={{
        ...style,
        boxSizing: "border-box",
        // width: `calc(${style.width} - 15px)`,
      }}
    >
      <Card className={classes.root} onClick={onClick}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={getPhotoLink(majorPhotoImageId, 500)}
            title={name}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="subtitle1"
              style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                fontFamily: "'PT Sans', sans-serif"
              }}
            >
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
