import React from "react";
import DelayedAnimContentLoader from "../../common/delayed-anim-content-loader/delayed-anim-content-loader";
import { detailDrawerTransitionDuration } from "../config";

export default function DrawerAnimContentLoader(props) {
  
  return <DelayedAnimContentLoader {...props} delay={detailDrawerTransitionDuration + 100}></DelayedAnimContentLoader>;
}
