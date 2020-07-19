import React, { useContext, useState } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
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

function PhotoCarousel({ data, headerHeight, ...props }) {
  const { monumentService } = useContext(AppContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();

  const onLeftbuttonClick = () => {
    setCurrentSlide(currentSlide === 0 ? currentSlide : currentSlide - 1);
  };

  const onRightButtonClick = () => {
    setCurrentSlide(
      currentSlide === data.length - 1 ? currentSlide : currentSlide + 1
    );
  };



  return (
    <CarouselProvider
      naturalSlideWidth={theme.detailDrawerWidth}
      naturalSlideHeight={headerHeight}
      totalSlides={data.length}
      visibleSlides={1}
      dragEnabled={false}
      currentSlide={currentSlide}
    >
      <Slider style={headerHeight}>
        {data.map((monumentPhoto, i) => (
          <Slide index={i}>
            <img
              style={{
                width: "100%",
                height: headerHeight,
                objectFit: "cover",
              }}
              src={monumentService.getPhotoLink(monumentPhoto.photoId)}
            />
          </Slide>
        ))}
      </Slider>
      <CarouselButtonContainer>
        <IconButton onClick={onLeftbuttonClick}>
          <StrokeIcon>
            <ArrowBackIosIcon style={{ color: "white" }} />
          </StrokeIcon>
        </IconButton>
      </CarouselButtonContainer>
      <CarouselButtonContainer attachTo="right">
        <IconButton onClick={onRightButtonClick}>
          <StrokeIcon>
            <ArrowForwardIosIcon style={{ color: "white" }} />
          </StrokeIcon>
        </IconButton>
      </CarouselButtonContainer>
    </CarouselProvider>
  );
}

export default WithLoadingData(PhotoCarousel)(() => <div>Loading</div>);
