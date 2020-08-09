import React, { useContext, useRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import AppContext from "../../../context/app-context";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "./photo-lightbox.css";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  img: {
    width: "auto",
    height: "auto",
    maxWidth: "50%",
    verticalAlign: "middle",
  },
  slick: {
    height: "100%",
  },
}));

export default function PhotoLightbox({
  monumentPhotos,
  open,
  setOpen,
  selectedIndex,
  onChangePhoto,
}) {
  const classes = useStyles();
  const { monumentService } = useContext(AppContext);
  const images = monumentPhotos.map((monumentPhoto) => monumentService.getPhotoLink(monumentPhoto.id));

  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <React.Fragment>
      {open ? (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={(photoIndex + 1) === images.length ? null : images[photoIndex + 1]}
          prevSrc={photoIndex === 0 ? null : images[photoIndex -1]}
          onCloseRequest={() => setOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      ) : null}
    </React.Fragment>
  );
}
