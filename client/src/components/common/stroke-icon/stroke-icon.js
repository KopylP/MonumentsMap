import React, { useContext, useState } from "react";

const StrokeIcon = ({ children, strokeColor = "black", strokeWidth = 0.5 }) => {
  return React.cloneElement(children, {
    style: {
      stroke: strokeColor,
      strokeWidth,
      ...children.props.style,
    },
  });
};

export default StrokeIcon;
