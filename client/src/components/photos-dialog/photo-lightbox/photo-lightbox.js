import React, { useContext } from "react";
import AppContext from "../../../context/app-context";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import SwipeImageCarousel from "./swipe-image-carousel/swipe-image-carousel";
import DrawerBackButton from "../../common/drawer-back-button/drawer-back-button";
import SwipeableBottomSheet from "react-swipeable-bottom-sheet";

export default function PhotoLightbox({
  monumentPhotos,
  open,
  setOpen,
  initIndex,
}) {
  const { monumentService } = useContext(AppContext);
  const images = monumentPhotos.map((monumentPhoto) =>
    monumentService.getPhotoLink(monumentPhoto.id, 800)
  );

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <DrawerBackButton attachTo="left" onClick={handleClose} />
      <SwipeImageCarousel images={images} initIndex={initIndex}/>
    </Dialog>
  );
}
