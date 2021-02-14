import { Backdrop, Dialog, Fade, makeStyles, Modal } from "@material-ui/core";
import React from "react";
import AddPhotoForm from "./add-photo-form";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function AddPhotoModal({
  open,
  setOpen,
  monumentId,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={850}>
      <AddPhotoForm monumentId={monumentId} onComplited={handleClose} />
    </Dialog>
  );
}
