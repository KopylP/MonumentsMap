import React, { useRef, useState, useEffect, useContext } from "react";
import PinchZoomPan from "react-responsive-pinch-zoom-pan";
import useMutationObserver from "@rooks/use-mutation-observer";
import { getMinScale } from "react-responsive-pinch-zoom-pan/dist/Utils";

export default function PinchZoomImage({
  src,
  alt = "",
  onSizeChanged = (p) => p,
  onImageLoad = (p) => p,
}) {
  const [originalSize, setOriginalSize] = useState(true);
  const [portrait, setPortrait] = useState(true);
  const [key, setKey] = useState(Math.random());
  const imgRef = useRef();
  const pinchZoomPanRef = useRef();
  const onSizeChange = () => {
    const isPortrait = window.innerHeight > window.innerWidth;
    if (portrait !== isPortrait) {
      setPortrait(isPortrait);
      if (isPortrait === true) {
        setKey(Math.random());
        return;
      }
    }
    const { state, props } = pinchZoomPanRef.current;
    const { scale } = state;
    const minScale = getMinScale(state, props);
    const isOriginalSize = scale >= minScale - 0.03 && scale <= minScale + 0.03;
    if (isOriginalSize !== originalSize) {
      setOriginalSize(isOriginalSize);
      onSizeChanged(isOriginalSize);
    }
  };
  useMutationObserver(imgRef, onSizeChange);

  useEffect(() => {
    setPortrait(window.innerHeight > window.innerWidth);
  }, []);

  return (
    <PinchZoomPan
      maxScale={2}
      position="center"
      ref={pinchZoomPanRef}
      key={key}
      zoomButtons={false}
    >
      <img alt={alt} src={src} ref={imgRef} onLoad={onImageLoad} />
    </PinchZoomPan>
  );
}
