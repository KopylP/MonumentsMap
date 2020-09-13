import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { virtualize } from "react-swipeable-views-utils";
import SwipeImage from "../swipe-image/swipe-image";
import { isIOS, isChrome } from "react-device-detect";
import PhotoLightboxContext from "../context/photo-lightbox-context";
// var iOSInnerHeight = require("ios-inner-height");

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    backgroundColor: "black",
  },
}));

export default function SwipeImageCarousel({
  images,
  imageIndex,
  onChangeImageIndex,
  onOrientationChange = (p) => p,
}) {
  const classes = useStyles();
  const [swipeEnabled, setSwipeEnabled] = useState(true);
  const [portrait, setPortrait] = useState(true);

  const onSizeChanged = (isOriginalSize, touched) => {
    const isPortrait = window.innerHeight > window.innerWidth;
    if (portrait !== isPortrait) {
      setPortrait(isPortrait);
      onOrientationChange(portrait);
    }

    if (isOriginalSize && !touched && !swipeEnabled) {
      setSwipeEnabled(true);
      return;
    }
    if (!isOriginalSize && swipeEnabled) {
      setSwipeEnabled(false);
      return;
    }
  };

  const [height, setHeight] = useState(window.innerHeight);
  const handleResize = () => {
    setHeight(window.innerHeight);
  };

  useState(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize");
    };
  }, []);

  const [switching, setSwitching] = useState(false);

  const slideRenderer = ({ key, index }) => (
    <SwipeImage src={images[index]} key={key} onSizeChanged={onSizeChanged} />
  );

  return (
    <div
      className={classes.container}
      style={
        isIOS && isChrome
          ? {
              height: "100vh",
              width: "100vw",
              overflow: "hidden",
            }
          : {
              height: height,
            }
      }
    >
      <PhotoLightboxContext.Provider value={{ switching }}>
        <VirtualizeSwipeableViews
          disabled={!swipeEnabled}
          index={imageIndex}
          slideCount={images.length}
          overscanSlideBefore={3}
          overscanSlideAfter={3}
          onChangeIndex={(index) => {
            onChangeImageIndex(index);
          }}
          onSwitching={(e) => {
            if (switching === false && !Number.isInteger(e)) setSwitching(true);
            if (switching === true && Number.isInteger(e)) setSwitching(false);
          }}
          containerStyle={
            isIOS && isChrome
              ? {
                  height: "100vh",
                  width: "100vw",
                  // overflowY: "hidden"
                }
              : {
                  height: height,
                  width: "100vw",
                }
          }
          slideRenderer={slideRenderer}
        />
      </PhotoLightboxContext.Provider>
    </div>
  );
}
