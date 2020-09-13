import React, { useRef, useState, useEffect, useContext, memo } from "react";
import PinchZoomPan from "react-responsive-pinch-zoom-pan";
import useMutationObserver from "@rooks/use-mutation-observer";
import { getMinScale } from "react-responsive-pinch-zoom-pan/dist/Utils";
import PhotoLightboxContext from "../context/photo-lightbox-context";
import useCancelablePromise from "@rodw95/use-cancelable-promise";
import Axios from "axios";

export default memo(function PinchZoomImage({
  src,
  alt = "",
  onSizeChanged = (p) => p,
  onImageLoad = (p) => p,
  maxScale = 2,
}) {
  const [originalSize, setOriginalSize] = useState(true);
  const [portrait, setPortrait] = useState(true);
  const [key, setKey] = useState(Math.random());
  const [imageMaxScale, setImageMaxScale] = useState(maxScale);
  const imgRef = useRef();
  const pinchZoomPanRef = useRef();
  const { switching = null } = useContext(PhotoLightboxContext);
  const [touch, setTouch] = useState(false);

  const onSizeChange = () => {
    const isPortrait = window.innerHeight > window.innerWidth;
    if (portrait !== isPortrait) {
      setPortrait(isPortrait);
      setKey(Math.random());
      return;
    }
    const { state, props } = pinchZoomPanRef.current;
    const { scale } = state;
    const minScale = getMinScale(state, props);
    const isOriginalSize = scale <= minScale;
    if (isOriginalSize !== originalSize) {
      setOriginalSize(isOriginalSize);
      onSizeChanged(isOriginalSize, touch);
    }
  };

  const handleImageLoad = (e) => {
    onImageLoad(e);
  };

  const handleTouchEnd = () => {
    if (touch !== false) {
      setTouch(false);
      onSizeChanged(originalSize, false);
    }
  };

  useMutationObserver(imgRef, onSizeChange);

  useEffect(() => {
    setPortrait(window.innerHeight > window.innerWidth);
    setKey(Math.random());
  }, [src]);

  useEffect(() => {
    if (switching !== null) {
      if (switching) {
        const { state, props } = pinchZoomPanRef.current;
        setImageMaxScale(getMinScale(state, props));
      } else {
        setImageMaxScale(maxScale);
      }
    }
  }, [switching]);


  return (
    <React.Fragment>
      <PinchZoomPan
        maxScale={imageMaxScale}
        position="center"
        ref={pinchZoomPanRef}
        key={key}
        zoomButtons={false}
      >
        <img
          alt={alt}
          src={src}
          ref={imgRef}
          onTouchStartCapture={() => setTouch(true)}
          onTouchEndCapture={handleTouchEnd}
          onLoad={handleImageLoad}
          style={{ maxWidth: "100%" }}
        />
      </PinchZoomPan>
    </React.Fragment>
  );
});
