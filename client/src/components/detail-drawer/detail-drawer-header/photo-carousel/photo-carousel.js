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

function PhotoCarousel({ data, ...props }) {
  const { monumentService } = useContext(AppContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const styles = useStyles(props);
  const theme = useTheme();

  return (
    <CarouselProvider
      naturalSlideWidth={theme.detailDrawerWidth}
      naturalSlideHeight={theme.detailDrawerHeaderHeight}
      totalSlides={data.length}
      visibleSlides={1}
      dragEnabled={false}
    >
      <Slider className={styles.slider}>
        {data.map((monumentPhoto, i) => (
          <Slide index={i} onBlur={(e) => console.log(e)}>
            <img
              className={styles.img}
              src={monumentService.getPhotoLink(monumentPhoto.photoId)}
            />
          </Slide>
        ))}
      </Slider>
      {data.length > 1
        ? [
            <CarouselButtonContainer>
              <ButtonBack className="move-button">
                <StrokeIcon>
                  <ArrowBackIosIcon className={styles.arrowIcon} />
                </StrokeIcon>
              </ButtonBack>
            </CarouselButtonContainer>,
            <CarouselButtonContainer attachTo="right">
              <ButtonNext className="move-button">
                <StrokeIcon>
                  <ArrowForwardIosIcon className={styles.arrowIcon} />
                </StrokeIcon>
              </ButtonNext>
            </CarouselButtonContainer>,
          ]
        : null}
    </CarouselProvider>
  );
}

export default WithLoadingData(PhotoCarousel)(() => {
  const theme = useTheme();
  console.log(theme);
  return (
    <ContentLoader height={theme.detailDrawerHeaderHeight} width={theme.detailDrawerWidth}>
      <rect
        x="0"
        y="0"
        width={theme.detailDrawerWidth}
        height={theme.detailDrawerHeaderHeight}
      />
    </ContentLoader>
  );
});
