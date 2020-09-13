import React, { useState, memo, useEffect } from "react";
import SwipeableBottomSheet from "react-swipeable-bottom-sheet";
import { usePrevious } from "../../../hooks/hooks";
import PhotoYear from "../../common/photo-year/photo-year";
import { doIfNotTheSame } from "../../helpers/conditions";

function areEqual(prevProps, nextProps) {
  if (
    prevProps.monumentPhoto.id === nextProps.monumentPhoto.id &&
    prevProps.visibility === nextProps.visibility
  )
    return true;
  return false;
}

export default memo(function MobilePhotoDescriptionBottomSheet({
  monumentPhoto,
  visibility,
}) {
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const prevMonumentPhoto = usePrevious(monumentPhoto);

  const handeOpenBottomSheet = (isOpen) => {
    if (isOpen && !openBottomSheet) {
      setOpenBottomSheet(isOpen);
    } else if (!isOpen && openBottomSheet) {
      setOpenBottomSheet(isOpen);
    }
  };

  useEffect(() => {
    doIfNotTheSame(
      prevMonumentPhoto,
      monumentPhoto
    )(() => setOpenBottomSheet(false));
  }, [monumentPhoto]);

  const [disabled, setDisabled] = useState(false);
  const handleScroll = (e) => {
    const scrollTop = e.nativeEvent.srcElement.scrollTop;
    if (scrollTop <= 1 && disabled) {
      setDisabled(false);
    }
    if (scrollTop > 1 && !disabled) {
      setDisabled(true);
    }
  };

  return (
    <SwipeableBottomSheet
      topShadow={false}
      overlay={false}
      overflowHeight={64}
      open={openBottomSheet}
      onChange={handeOpenBottomSheet}
      style={{ zIndex: 9999, visibility: visibility ? "visible" : "hidden" }}
      bodyStyle={{
        backgroundColor: "transparent",
        boxSizing: "border-box",
        zIndex: 9999,
      }}
      scrollTopAtClose={false}
      marginTop={20}
      swipeableViewsProps={{
        onScroll: handleScroll,
        disabled,
      }}
    >
      <div
        style={{
          minHeight: 64,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "#ddd",
          padding: 20,
          fontSize: 14,
        }}
      >
        <PhotoYear year={monumentPhoto.year} period={monumentPhoto.period} />
        <div style={{ clear: "both", marginBottom: 2 }} />
        <span>{monumentPhoto.description}</span>
        <br />
        <br />
        <span>Джерела:</span>
        <div style={{ clear: "both", marginBottom: 2 }} />
        {monumentPhoto.sources &&
          monumentPhoto.sources.map((source, i) => {
            return (
              <React.Fragment key={i}>
                {source.sourceLink !== "" ? (
                  <a href={source.sourceLink} target="_blank">
                    {source.title}
                  </a>
                ) : (
                  <span>{source.title}</span>
                )}
                <br />
              </React.Fragment>
            );
          })}
      </div>
    </SwipeableBottomSheet>
  );
},
areEqual);
