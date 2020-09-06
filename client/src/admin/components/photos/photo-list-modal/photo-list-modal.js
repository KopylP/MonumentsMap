import React, { useContext, useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import { Paper, Fade, Backdrop, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PhotoList from "./photo-list/photo-list";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paper: {
    position: "absolute",
    width: "auto",
    height: "90%",
    maxWidth: "98%",
    display: "flex",
    flexWrap: "wrap",
    // backgroundColor: "white",
    justifyContent: "flex-start",
    alignContent: "center",
    overflow: "auto",
    outline: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));

export default function PhotoListModal({
  monumentId,
  open,
  setOpen,
  ...props
}) {
  const classes = useStyles(props);
  const handleClose = () => {
    setOpen(false);
  };

  console.log(monumentId);

  return (
    <React.Fragment>
      {typeof monumentId ? (
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
            <div className={classes.paper}>
              <PhotoList params={[monumentId]} />
            </div>
          </Fade>
        </Modal>
      ) : null}
    </React.Fragment>
  );
}
