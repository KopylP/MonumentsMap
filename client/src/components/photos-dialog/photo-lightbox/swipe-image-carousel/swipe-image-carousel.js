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

export default function SwipeImageCarousel({ images, initIndex }) {

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

  const [viewIndex, setViewIndex] = useState(initIndex);

  const handleChangeIndex = (index) => {
    setViewIndex(index);
  };

  const slideRenderer = (params) => {
    const { key, index } = params;
    return (
      <SwipeImage src={images[index]} key={key} onSizeChanged={onSizeChanged} />
    );
  };

  return (
    <div className={classes.container}>
      <VirtualizeSwipeableViews
        enableMouseEvents
        disabled={!swipeEnabled}
        index={viewIndex}
        hysteresis={0.4}
        onChangeIndex={handleChangeIndex}
        slideCount={images.length}
        cols={1}
        threshold={10}
        containerStyle={{
          height: isMobile ? "-webkit-fill-available": "100vh"
        }}
        slideRenderer={slideRenderer}
      />
    </div>
  );
}
