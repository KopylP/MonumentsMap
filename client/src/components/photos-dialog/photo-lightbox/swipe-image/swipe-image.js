import React from "react";
import SwipeViewContainer from "../swipe-view-container/swipe-view-container";
import PinchZoomImageContainer from "../pinch-zoom-image-container/pinch-zoom-image-container";
import PinchZoomImage from "../pinch-zoom-image/pinch-zoom-image";

export default function SwipeImage({ src, onSizeChanged = (p) => p }) {
  return (
    <SwipeViewContainer>
      <PinchZoomImageContainer>
        {/* { !canZoom && <div style={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0, zIndex: 10,}}></div> } */}
        <PinchZoomImage
          onSizeChanged={onSizeChanged}
          src={src}
        />
      </PinchZoomImageContainer>
    </SwipeViewContainer>
  );
}
