import React from "react";
import DelayedAnimList from "../../common/delayed-anim-content-loader/delayed-anim-list";
import { detailDrawerTransitionDuration } from "../config";

export default function DrawerAnimList(props) {
  return (
    <DelayedAnimList {...props} delay={detailDrawerTransitionDuration + 100} />
  );
}
