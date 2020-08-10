import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    leftAttach: {
      display: "flex",
      alignItems: "center",
      left: 10,
      top: 0,
      bottom: 0,
      pointerEvents: "none",
      position: "absolute",
      backgroundColor: "transparent",
      zIndex: 999
    },
    rightAttach: {
      display: "flex",
      alignItems: "center",
      right: 10,
      top: 0,
      bottom: 0,
      pointerEvents: "none",
      position: "absolute",
      backgroundColor: "transparent",
      zIndex: 999
    },
  }));
  
  const CarouselButtonContainer = ({
    attachTo = "left" /*right*/,
    children,
    props,
  }) => {
    const styles = useStyles(props);
    return (
      <div
        className={attachTo === "right" ? styles.rightAttach : styles.leftAttach}
      >
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            style: {
              pointerEvents: "auto",
            },
          });
        })}
      </div>
    );
  };

  export default CarouselButtonContainer;