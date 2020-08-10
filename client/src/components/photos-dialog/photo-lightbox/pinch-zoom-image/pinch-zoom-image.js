import React, { useRef, useState } from "react";
import PinchZoomPan from "react-responsive-pinch-zoom-pan";
import useMutationObserver from "@rooks/use-mutation-observer";

export default function PinchZoomImage({
  src,
  alt = "",
  onSizeChanged = (p) => p,
  onImageLoad = (p) => p,
}) {
  const getElementMatrix = (element) => {
    return window.getComputedStyle(element).transform;
  };
  const [defaultMatrix, setDefaultMatrix] = useState();
  const imgRef = useRef();
  const onSizeChange = () => {
    const matrix = getElementMatrix(imgRef.current);
    if (!defaultMatrix) {
      setDefaultMatrix(matrix);
      return;
    }
    onSizeChanged(matrix === defaultMatrix);
  };
  useMutationObserver(imgRef, onSizeChange);

  return (
    <PinchZoomPan maxScale={2} position="center" zoomButtons={false}>
      <img alt={alt} src={src} ref={imgRef} onLoad={onImageLoad} />
    </PinchZoomPan>
  );
}
