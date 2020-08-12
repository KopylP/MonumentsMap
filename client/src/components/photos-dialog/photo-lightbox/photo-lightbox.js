import React, { useContext, useState } from "react";
import AppContext from "../../../context/app-context";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import SwipeImageCarousel from "./swipe-image-carousel/swipe-image-carousel";
import DrawerBackButton from "../../common/drawer-back-button/drawer-back-button";
import SwipeableBottomSheet from "react-swipeable-bottom-sheet";
import MobilePhotoDescriptionBottomSheet from "../mobile-photo-description-botton-sheet/mobile-photo-description-bottom-sheet";

export default function PhotoLightbox({
  monumentPhotos,
  open,
  setOpen,
  initIndex,
}) {
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
      style={{
        boxSizing: "border-box"
      }}
    >
      <DrawerBackButton attachTo="left" onClick={handleClose} />
      <LightboxWithBottomSheet
        monumentPhotos={monumentPhotos}
        initIndex={initIndex}
      />
    </Dialog>
  );
}

const LightboxWithBottomSheet = ({ monumentPhotos, initIndex }) => {
  const [imageIndex, setImageIndex] = useState(initIndex);
  const { monumentService } = useContext(AppContext);
  const images = monumentPhotos.map((monumentPhoto) =>
    monumentService.getPhotoLink(monumentPhoto.id, 700)
  );

  return (
    <React.Fragment>
      <SwipeImageCarousel
        images={images}
        imageIndex={imageIndex}
        onChangeImageIndex={setImageIndex}
      />
      <MobilePhotoDescriptionBottomSheet
        monumentPhoto={monumentPhotos[imageIndex]}
      />
    </React.Fragment>
  );
};
