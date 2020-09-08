import React from "react";
import { Slide } from "@material-ui/core";
import PhotosList from "../photos-list/photos-list";

export default function PhotoListSlider({
  monumentPhotos,
  selectedMonumentPhotoIndex,
  onMonumentPhotoClick,
  originalSize,
}) {
  return (
    <Slide
      direction="up"
      in={originalSize}
      style={{ position: "absolute", bottom: 40, left: 0, right: 0 }}
    >
      <div
        style={{
          backgroundColor: "transparent",
        }}
      >
        <PhotosList
          monumentPhotos={monumentPhotos}
          selectedMonumentPhotoIndex={selectedMonumentPhotoIndex}
          onMonumentPhotoClick={onMonumentPhotoClick}
        />
      </div>
    </Slide>
  );
}
