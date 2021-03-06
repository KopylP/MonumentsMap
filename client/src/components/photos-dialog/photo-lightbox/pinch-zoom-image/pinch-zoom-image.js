import React, { useRef, useState, useEffect, memo } from "react";
import PinchZoomPan from "react-responsive-pinch-zoom-pan";
import useMutationObserver from "@rooks/use-mutation-observer";
import { getMinScale } from "react-responsive-pinch-zoom-pan/dist/Utils";

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
  const imgRef = useRef();
  const pinchZoomPanRef = useRef();

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
      onSizeChanged(isOriginalSize);
    }
  };

  const handleImageLoad = (e) => {
    onImageLoad(e);
  };

  useMutationObserver(imgRef, onSizeChange);

  useEffect(() => {
    setPortrait(window.innerHeight > window.innerWidth);
    setKey(Math.random());
  }, [src]);

  return (
    <React.Fragment>
      <PinchZoomPan
        maxScale={maxScale}
        position="center"
        ref={pinchZoomPanRef}
        key={key}
        zoomButtons={false}
      >
        <img
          alt={alt}
          src={src}
          ref={imgRef}
          onLoad={handleImageLoad}
          style={{ maxWidth: "100%" }}
        />
      </PinchZoomPan>
    </React.Fragment>
  );
});
