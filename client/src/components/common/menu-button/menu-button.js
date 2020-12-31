import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { openDrawer } from "../../../actions/filter-actions";

const useStyles = makeStyles((theme) => ({
  paper: {
    background: "white",
    borderRadius: 5,
    backgroundColor: theme.palette.secondary.main,
    padding: 5,
    color: "white",
    "&:hover": {
      background: "#eee",
    },
  },
}));

function MenuButton({ className, openDrawer }) {
  const classes = useStyles();
  return (
    <IconButton className={clsx(classes.paper, className)} onClick={openDrawer}>
      <MenuIcon />
    </IconButton>
  );
}

const bindDispatchToProps = { openDrawer };

export default connect(null, bindDispatchToProps)(MenuButton);
