import { Slide } from "@material-ui/core";
import React from "react";

const SlideUpTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default SlideUpTransition;
