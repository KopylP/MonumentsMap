import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from 'clsx';
import { makeStyles, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    background: "white",
    borderRadius: 5,
    padding: 5,
    '&:hover': {
        background: "#eee"
    }
  },
}));

export default function MenuButton(props) {
  const classes = useStyles(props);
  const { onClick, className } = props;
  return (
    <IconButton className={clsx(classes.paper, className)} onClick={onClick}>
      <MenuIcon />
    </IconButton>
  );
}
