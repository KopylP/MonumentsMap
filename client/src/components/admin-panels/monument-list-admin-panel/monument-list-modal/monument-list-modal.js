import React, { useContext, useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import {
  Fade,
  Backdrop,

} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppContext from "../../../../context/app-context";
import MonumentList from "./monument-list/monument-list";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function MonumentListModal({ open, setOpen }) {
  const classes = useStyles();
  const { monumentService } = useContext(AppContext);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
          <MonumentList />
      </Fade>
    </Modal>
  );
}
