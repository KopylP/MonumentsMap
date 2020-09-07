import React, { useState, useEffect } from "react";
import PinchZoomImageContainer from "../photo-lightbox/pinch-zoom-image-container/pinch-zoom-image-container";
import PinchZoomImage from "../photo-lightbox/pinch-zoom-image/pinch-zoom-image";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    width: "100%",
    overflow: "hidden",
    display: "flex",
    minHeight: "100%",
    position: "relative"
  },
  blackLoadingContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: "black"
  }
});

export default function PhotoViewer({ imgUrl, onSizeChanged = (p) => p }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
  }, [imgUrl]);

  const handleLoadImage = () => {
    setTimeout(() => {
      setLoading(false);
    }, 50);
  }

  return (
    <div className={classes.container}>
       {loading ? <div className={classes.blackLoadingContainer}/> : null }
      <PinchZoomImageContainer>
        <PinchZoomImage
          src={imgUrl}
          maxScale={4}
          onSizeChanged={onSizeChanged}
          onImageLoad={handleLoadImage}
        />
      </PinchZoomImageContainer>
    </div>
  );
}
