import React from "react";
import { Dialog, Fade } from "@material-ui/core";
import PhotosContainer from "./photos-container/photos-container";


export default function PhotosDialog({
  open,
  setOpen,
  initIndex,
  monumentPhotos,
}) {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />;
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      style={open ? { display: "block" } : { display: "none" }}
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <PhotosContainer
        onBack={handleClose}
        initIndex={initIndex}
        monumentPhotos={monumentPhotos}
      />
    </Dialog>
  );
}
