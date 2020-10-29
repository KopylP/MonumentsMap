import React from "react";
import Fade from "@material-ui/core/Fade";
import Dialog from "@material-ui/core/Dialog";
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
