import React, { useContext, useState } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonNext,
  ButtonBack,
} from "pure-react-carousel";
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

const useStyles = makeStyles((theme) => ({
  img: {
    width: "100%",
    height: theme.detailDrawerHeaderHeight,
    objectFit: "cover",
  },
  slider: {
    height: theme.detailDrawerHeaderHeight,
  },
  arrowIcon: {
    color: "white",
  },
}));

function PhotoCarousel({ data, onMonumentPhotoClicked = p => p }) {
  const { monumentService } = useContext(AppContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const styles = useStyles();
  const theme = useTheme();

  const sortedPhotos = data.sort((a, b) => {
    if(a.majorPhoto === true) return -1;
    if(b.majorPhoto === true) return 1;
    else return 0;
  })


  return (
    <CarouselProvider
      naturalSlideWidth={theme.detailDrawerWidth}
      naturalSlideHeight={theme.detailDrawerHeaderHeight}
      totalSlides={sortedPhotos.length}
      visibleSlides={1}
      dragEnabled={false}
    >
      <Slider className={styles.slider}>
        {sortedPhotos.map((monumentPhoto, i) => (
          <Slide index={i} onClick={_ => onMonumentPhotoClicked(monumentPhoto)}>
            <img
              className={styles.img}
              src={monumentService.getPhotoLink(monumentPhoto.photoId)}
            />
          </Slide>
        ))}
      </Slider>
      <CarouselButtonContainer>
        <ButtonBack className="move-button">
          <StrokeIcon>
            <ArrowBackIosIcon className={styles.arrowIcon} />
          </StrokeIcon>
        </ButtonBack>
      </CarouselButtonContainer>
      <CarouselButtonContainer attachTo="right">
        <ButtonNext className="move-button">
          <StrokeIcon>
            <ArrowForwardIosIcon className={styles.arrowIcon} />
          </StrokeIcon>
        </ButtonNext>
      </CarouselButtonContainer>
    </CarouselProvider>
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
