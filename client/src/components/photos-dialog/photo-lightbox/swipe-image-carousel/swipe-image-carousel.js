import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { virtualize } from "react-swipeable-views-utils";
import SwipeImage from "../swipe-image/swipe-image";
import useMutationObserver from "@rooks/use-mutation-observer";
import { isIOS, isChrome } from "react-device-detect";
var iOSInnerHeight = require("ios-inner-height");

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

  const onSizeChanged = (isOriginalSize) => {
    const isPortrait = window.innerHeight > window.innerWidth;
    if (portrait !== isPortrait) {
      setPortrait(isPortrait);
      onOrientationChange(portrait);
    }

    if (isOriginalSize && !swipeEnabled) {
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

  return (
    <div
      className={classes.container}
      style={
        isIOS && isChrome
          ? {
              height: "100vh",
              width: "100vw",
              overflow: "hidden"
            }
          : {
              height: height,
            }
      }
    >
      <SwipeableViews
        enableMouseEvents
        disabled={!swipeEnabled}
        index={imageIndex}
        hysteresis={0.4}
        onChangeIndex={onChangeImageIndex}
        slideCount={images.length}
        threshold={1}
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
        // slideRenderer={slideRenderer}
      >
        {images.map((image) => (
          <SwipeImage src={image} key={image} onSizeChanged={onSizeChanged} />
        ))}
      </SwipeableViews>
    </div>
  );
}
