import React, { useState, memo, useEffect, useLayoutEffect } from "react";
import { Trans } from "react-i18next";
import SwipeableBottomSheet from "react-swipeable-bottom-sheet";
import { usePrevious } from "../../../hooks/hooks";
import SimpleDetailYear from "../../detail-drawer/detail-year/simple-detail-year";
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
  const [details, setDetails] = useState(null);
  const handeOpenBottomSheet = (isOpen) => {
    if (isOpen && !openBottomSheet) {
      setOpenBottomSheet(isOpen);
    } else if (!isOpen && openBottomSheet) {
      setOpenBottomSheet(isOpen);
    }
  };

  const setDataWithDelay = (monumentPhoto) => {
    if (openBottomSheet) {
      setTimeout(() => {
        setDetails(monumentPhoto);
      }, 100);
    } else {
      setDetails(monumentPhoto);
    }
  };

  useLayoutEffect(() => {
    doIfNotTheSame(
      prevMonumentPhoto,
      monumentPhoto
    )(() => {
      setOpenBottomSheet(false);
      doIfNotTheSame(
        details,
        monumentPhoto
      )(() => setDataWithDelay(monumentPhoto));
    });
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
        {details && (
          <React.Fragment>
            <SimpleDetailYear year={details.year} period={details.period} />
            <div style={{ clear: "both", marginBottom: 2 }} />
            <span>{details.description}</span>
            <br />
            <br />
            <span><Trans>Sources</Trans>:</span>
            <div style={{ clear: "both", marginBottom: 2 }} />
            {details.sources &&
              details.sources.map((source, i) => {
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
          </React.Fragment>
        )}
      </div>
    </SwipeableBottomSheet>
  );
},
areEqual);
