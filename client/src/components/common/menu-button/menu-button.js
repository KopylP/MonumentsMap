import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from 'clsx';
import IconButton  from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

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
