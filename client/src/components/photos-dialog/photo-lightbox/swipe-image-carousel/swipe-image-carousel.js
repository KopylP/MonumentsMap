import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { virtualize } from "react-swipeable-views-utils";
import SwipeImage from "../swipe-image/swipe-image";
import { isMobile } from "react-device-detect";

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
}));

export default function SwipeImageCarousel({ images, imageIndex, onChangeImageIndex }) {

  const classes = useStyles();
  const [swipeEnabled, setSwipeEnabled] = useState(true);

  const onSizeChanged = (isOriginalSize) => {
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
  }

  useState(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize")
    }
  }, []);

  return (
    <div className={classes.container}>
      <SwipeableViews
        enableMouseEvents
        disabled={!swipeEnabled}
        index={imageIndex}
        hysteresis={0.4}
        onChangeIndex={onChangeImageIndex}
        slideCount={images.length}
        threshold={1}
        containerStyle={{
          height: height,
          width: "100%",
        }}
        // slideRenderer={slideRenderer}
      >
        {images.map((image) => (
          <SwipeImage src={image} key={image} onSizeChanged={onSizeChanged} />
        ))}
      </SwipeableViews>
    </div>
  );
}
