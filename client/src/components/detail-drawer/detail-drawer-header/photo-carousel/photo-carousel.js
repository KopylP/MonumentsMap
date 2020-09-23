import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../../../context/app-context";
import WithLoadingData from "../../../hoc-helpers/with-loading-data";
import { IconButton, makeStyles, useTheme } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import "./photo-carousel.css";
import CarouselButtonContainer from "./carousel-button-container/carousel-button-container";
import StrokeIcon from "../../../common/stroke-icon/stroke-icon";
import ContentLoader from "react-content-loader";
import SwipeableViews from "react-swipeable-views";
import { isMobileOnly } from "react-device-detect";
import sortMonumentPhotos from "../../../helpers/sort-monument-photos";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    position: "relative",
    display: "inline-block",
    height: theme.detailDrawerHeaderHeight,
    overflow: "hidden",
    backgroundColor: "transparent"
  },
  img: {
    width: theme.detailDrawerWidth,
    [theme.breakpoints.down(theme.detailDrawerWidth)]: {
      width: "100%",
    },
    height: theme.detailDrawerHeaderHeight,
    objectFit: "cover",
  },
  slide: {
    height: theme.detailDrawerHeaderHeight,
  },
  slider: {
    height: theme.detailDrawerHeaderHeight,
  },
  arrowIcon: {
    color: "white",
    zIndex: 9999,
  },
}));

function PhotoCarousel({ data, onMonumentPhotoClicked = (p) => p }) {
  const { monumentService } = useContext(AppContext);
  const styles = useStyles();
  const theme = useTheme();

  const sortedPhotos = data.sort(sortMonumentPhotos);

  const [currentIndex, setCurrentIndex] = useState(0);

  const onChangeIndexHandle = (index) => {
    setCurrentIndex(index);
  };

  const onRightButtonClick = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const onLeftButtonClick = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const [animateTransitions] = useState(true);

  return (
    <div className={styles.container}>
      <SwipeableViews
        disableLazyLoading={false}
        index={currentIndex}
        animateTransitions={animateTransitions}
        onChangeIndex={onChangeIndexHandle}
        disabled={isMobileOnly}
      >
        {sortedPhotos.map((monumentPhoto, i) => (
          <img
            className={styles.img}
            onClick={() => onMonumentPhotoClicked(monumentPhoto)}
            src={monumentService.getPhotoLink(monumentPhoto.photoId, 500)}
            key={i}
          />
        ))}
      </SwipeableViews>
      {!isMobileOnly && currentIndex !== 0 ? (
        <CarouselButtonContainer attachTo="left">
          <IconButton onClick={onLeftButtonClick}>
            <ArrowBackIosIcon className={styles.arrowIcon} />
          </IconButton>
        </CarouselButtonContainer>
      ) : null}
      {!isMobileOnly && currentIndex < sortedPhotos.length - 1 ? (
        <CarouselButtonContainer attachTo="right">
          <IconButton onClick={onRightButtonClick}>
            <ArrowForwardIosIcon className={styles.arrowIcon} />
          </IconButton>
        </CarouselButtonContainer>
      ) : null}
    </div>
  );
}

export default WithLoadingData(PhotoCarousel)(() => {
  const theme = useTheme();
  return (
    <ContentLoader
      height={theme.detailDrawerHeaderHeight}
      width={theme.detailDrawerWidth}
    >
      <rect
        x="0"
        y="0"
        width={theme.detailDrawerWidth}
        height={theme.detailDrawerHeaderHeight}
      />
    </ContentLoader>
  );
});
