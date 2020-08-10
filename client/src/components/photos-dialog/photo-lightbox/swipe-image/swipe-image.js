import React from "react";
import SwipeViewContainer from "../swipe-view-container/swipe-view-container";
import PinchZoomImageContainer from "../pinch-zoom-image-container/pinch-zoom-image-container";
import PinchZoomImage from "../pinch-zoom-image/pinch-zoom-image";

export default function SwipeImage({ src, onSizeChanged = (p) => p }) {
  return (
    <SwipeViewContainer>
      <PinchZoomImageContainer>
        <PinchZoomImage
          onSizeChanged={onSizeChanged}
          // src="http://picsum.photos/700/700"
          src={src}
        />
      </PinchZoomImageContainer>
    </SwipeViewContainer>
  );
}
