import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from 'clsx';
import { Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    background: "white",
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    '&:hover': {
        background: "#eee"
    }
  },
}));

export default function MenuButton(props) {
  const classes = useStyles(props);
  const { onClick, className } = props;
  return (
    <Paper className={clsx(classes.paper, className)} onClick={onClick}>
      <MenuIcon />
    </Paper>
  );
}
