import React, { useState, useEffect } from "react";
import PinchZoomImageContainer from "../photo-lightbox/pinch-zoom-image-container/pinch-zoom-image-container";
import PinchZoomImage from "../photo-lightbox/pinch-zoom-image/pinch-zoom-image";
import { makeStyles } from "@material-ui/core";
import PhotoLightboxContext from "../photo-lightbox/context/photo-lightbox-context";

const useStyles = makeStyles({
  container: {
    width: "100%",
    overflow: "hidden",
    display: "flex",
    minHeight: "100%",
    position: "relative",
  },
  blackLoadingContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: "black",
  },
});

export default function PhotoViewer({ imgUrl, onSizeChanged = (p) => p, onImageLoad = p => p }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [imgUrl]);

  const handleLoadImage = () => {
    setTimeout(() => {
      setLoading(false);
      onImageLoad();
    }, 50);
  };

  return (
    <PhotoLightboxContext.Provider value={{switching: false}}>
      <div className={classes.container}>
        {loading ? <div className={classes.blackLoadingContainer} /> : null}
        <PinchZoomImageContainer>
          <PinchZoomImage
            src={imgUrl}
            maxScale={4}
            onSizeChanged={onSizeChanged}
            onImageLoad={handleLoadImage}
          />
        </PinchZoomImageContainer>
      </div>
    </PhotoLightboxContext.Provider>
  );
}
