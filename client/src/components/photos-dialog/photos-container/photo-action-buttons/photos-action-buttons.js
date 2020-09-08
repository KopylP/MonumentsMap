import React from "react";
import CloseButton from "./close-button";
import SaveButton from "./save-button";

export default function PhotosActionButtons({ onClick = (p) => p }) {
  return (
    <div
      style={{
        position: "absolute",
        right: 10,
        top: 10,
        color: "white",
        zIndex: 999,
      }}
    >
      <SaveButton onClick={() => onClick("save")} />
      <CloseButton onClick={() => onClick("close")} />
    </div>
  );
}
