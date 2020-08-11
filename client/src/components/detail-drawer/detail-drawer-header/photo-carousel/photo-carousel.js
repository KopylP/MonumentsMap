import React, { useContext, useState } from "react";
import "pure-react-carousel/dist/react-carousel.es.css";
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

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    position: "relative",
    display: "inline-block",
    padding: 1,
    height: theme.detailDrawerHeaderHeight,
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const styles = useStyles();
  const theme = useTheme();

  const sortedPhotos = data.sort((a, b) => {
    if (a.majorPhoto === true) return -1;
    if (b.majorPhoto === true) return 1;
    else return 0;
  });

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

  return (
    <div className={styles.container}>
      <SwipeableViews
        disableLazyLoading
        index={currentIndex}
        onChangeIndex={onChangeIndexHandle}
      >
        {sortedPhotos.map((monumentPhoto, i) => (
          <img
            className={styles.img}
            onClick={() => onMonumentPhotoClicked(monumentPhoto)}
            src={monumentService.getPhotoLink(monumentPhoto.photoId, 500)}
          />
        ))}
      </SwipeableViews>
      {currentIndex !== 0 ? (
        <CarouselButtonContainer attachTo="left">
          <IconButton onClick={onLeftButtonClick}>
            <ArrowBackIosIcon className={styles.arrowIcon} />
          </IconButton>
        </CarouselButtonContainer>
      ) : null}
      {currentIndex < sortedPhotos.length - 1 ? (
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
