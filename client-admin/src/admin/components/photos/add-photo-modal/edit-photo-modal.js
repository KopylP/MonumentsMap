import { Dialog } from "@material-ui/core";
import React from "react";
import EditPhotoForm from "./edit-photo-form";

export default function EditPhotoModal({
  onClose,
  monumentPhotoId,
}) {
  return (
    <Dialog
      onClose={onClose}
      open={monumentPhotoId != null}
      maxWidth={850}
    >
      <EditPhotoForm params={[monumentPhotoId]} onComplited={onClose} />
    </Dialog>
  );
}
