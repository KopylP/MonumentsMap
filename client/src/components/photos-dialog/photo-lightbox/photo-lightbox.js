import React, { useContext, useState, memo } from "react";
import AppContext from "../../../context/app-context";
import MobilePhotoDescriptionBottomSheet from "../mobile-photo-description-botton-sheet/mobile-photo-description-bottom-sheet";
import { PhotoSwipe } from "react-photoswipe-2";
import "react-photoswipe-2/lib/photoswipe.css";
import "./photo-lightbox.css";
import { isIOS } from "react-device-detect";
import DrawerBackButton from "../../common/drawer-back-button/drawer-back-button";

export default function PhotoLightbox({
  monumentPhotos,
  open,
  setOpen,
  initIndex = 0,
}) {
  const {
    monumentService: { getPhotoLink },
  } = useContext(AppContext);

  const images = monumentPhotos.map((monumentPhoto, i) => ({
    index: i,
    src: getPhotoLink(monumentPhoto.photoId, 800),
    w: 800,
    h: 800 / monumentPhoto.photo.imageScale,
    id: monumentPhoto.id,
    description: monumentPhoto.description,
    year: monumentPhoto.year,
    period: monumentPhoto.period,
    sources: monumentPhoto.sources,
  }));

  return (
    <LightboxWithBottomSheet
      images={images}
      open={open}
      setOpen={setOpen}
      initIndex={initIndex}
    />
  );
}

const LightboxWithBottomSheet = memo(function ({
  images,
  open,
  setOpen,
  initIndex,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <React.Fragment>
      {open && (
        <DrawerBackButton
          onClick={() => setOpen(false)}
          attachTo="left"
          fixed
        />
      )}
      <MonumentPhotoLightbox
        images={images}
        open={open}
        setOpen={setOpen}
        initIndex={initIndex}
        onCurrentIndexChange={setCurrentIndex}
      />
      <MobilePhotoDescriptionBottomSheet
        monumentPhoto={images[currentIndex]}
        visibility={open}
      />
    </React.Fragment>
  );
});

const MonumentPhotoLightbox = memo(function ({
  images,
  open,
  setOpen,
  initIndex = 0,
  onCurrentIndexChange = (p) => p,
}) {
  return (
    <PhotoSwipe
      isOpen={open}
      items={images}
      close={() => setOpen(false)}
      afterChange={(data) => onCurrentIndexChange(data.currItem.index)}
      options={{
        index: initIndex,
        shareEl: false,
        captionEl: false,
        closeEl: false,
        counterEl: false,
        fullscreenEl: false,
        loop: false,
        pinchToClose: false,
        history: !isIOS,
      }}
    />
  );
});
