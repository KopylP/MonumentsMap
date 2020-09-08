import React, { useState, useContext, useEffect, Fragment } from "react";
import SwipeableBottomSheet from "react-swipeable-bottom-sheet";
import PhotoYear from "../../common/photo-year/photo-year";
import AppContext from "../../../context/app-context";
import useCancelablePromise from "@rodw95/use-cancelable-promise";

export default function MobilePhotoDescriptionBottomSheet({ monumentPhoto }) {
  const [monumentPhotoDetail, setMonumentPhotoDetail] = useState(null);
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const { monumentService } = useContext(AppContext);
  const makeCancelable = useCancelablePromise();

  const onMonumentPhotoLoad = (monumentPhoto) => {
    setMonumentPhotoDetail(monumentPhoto);
  };

  const onMonumentPhotoError = () => {
    //TODO handle error
  };

  const update = () => {
    makeCancelable(monumentService.getMonumentPhoto(monumentPhoto.id))
      .then(onMonumentPhotoLoad)
      .catch(onMonumentPhotoError);
  };

  useEffect(() => {
    update();
    handeOpenBottomSheet(false);
  }, [monumentPhoto]);

  const handeOpenBottomSheet = (isOpen) => {
    if (isOpen && !openBottomSheet) {
      setOpenBottomSheet(isOpen);
    } else if (!isOpen && openBottomSheet) {
      setOpenBottomSheet(isOpen);
    }
  };

  const [disabled, setDisabled] = useState(false);
  const handleScroll = (e) => {
    const scrollTop = e.nativeEvent.srcElement.scrollTop;
    if (scrollTop <= 1 && disabled) {
      setDisabled(false);
    }
    if (scrollTop > 1 && !disabled) {
      setDisabled(true);
    }
  };

  return (
    <SwipeableBottomSheet
      topShadow={false}
      overlay={false}
      overflowHeight={64}
      open={openBottomSheet}
      onChange={handeOpenBottomSheet}
      bodyStyle={{ backgroundColor: "transparent", boxSizing: "border-box" }}
      scrollTopAtClose={false}
      marginTop={20}
      swipeableViewsProps={{
        onScroll: handleScroll,
        disabled,
      }}
    >
      <div
        style={{
          minHeight: 64,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "#ddd",
          padding: 20,
          fontSize: 14,
        }}
      >
        {monumentPhotoDetail ? (
          <React.Fragment>
            <PhotoYear
              year={monumentPhotoDetail.year}
              period={monumentPhotoDetail.period}
            />
            <React.Fragment>
              <div style={{ clear: "both", marginBottom: 2 }} />
              <span>{monumentPhotoDetail.description}</span>
              <br />
              <br />
              <span>Джерела:</span>
              <div style={{ clear: "both", marginBottom: 2 }} />
              {monumentPhotoDetail.sources.map((source) => {
                return (
                  <React.Fragment>
                    {source.sourceLink !== "" ? (
                      <a href={source.sourceLink} target="_blank">
                        {source.title}
                      </a>
                    ) : (
                      <span>{source.title}</span>
                    )}
                    <br />
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          </React.Fragment>
        ) : null}
      </div>
    </SwipeableBottomSheet>
  );
}
