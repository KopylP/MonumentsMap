import React from "react";
import CarouselButtonContainer from "../../detail-drawer/detail-drawer-header/photo-carousel/carousel-button-container/carousel-button-container";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import IconButton from "@material-ui/core/IconButton";

export default function PhotosContainerButtons({
  onLeftClick,
  onRightClick,
  hideLeftButton,
  hideRightButton,
}) {
  return (
    <React.Fragment>
      {!hideLeftButton ? (
        <CarouselButtonContainer attachTo="left">
          <IconButton onClick={onLeftClick}>
            <ArrowBackIosIcon style={{ color: "white" }} />
          </IconButton>
        </CarouselButtonContainer>
      ) : null}
      {!hideRightButton ? (
        <CarouselButtonContainer attachTo="right">
          <IconButton onClick={onRightClick}>
            <ArrowForwardIosIcon style={{ color: "white" }} />
          </IconButton>
        </CarouselButtonContainer>
      ) : null}
    </React.Fragment>
  );
}
