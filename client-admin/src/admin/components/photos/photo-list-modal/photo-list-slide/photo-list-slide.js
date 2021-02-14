import { Slide } from "@material-ui/core";
import React, { memo } from "react";
import MonumentPhotoListItem from "../photo-list-item/monument-photo-list-item";

export default memo(function PhotoListSlide({
  monumentPhoto,
  onEdit,
  setMonumentMajorPhotoByIndex,
  index,
  onExited,
  onDelete
}) {
  return (
    <Slide
      style={{ margin: 10 }}
      in={!monumentPhoto.deleted}
      direction="up"
      mountOnEnter
      unmountOnExit
      onExited={onExited}
    >
      <div>
        <MonumentPhotoListItem
          index={index}
          monumentPhoto={monumentPhoto}
          setMonumentMajorPhotoByIndex={setMonumentMajorPhotoByIndex}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </div>
    </Slide>
  );
});