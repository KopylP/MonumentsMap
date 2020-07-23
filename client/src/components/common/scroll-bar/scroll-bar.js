import React from "react";
import "./scroll-bar.css";
import * as cx from "classnames";
export default function ScrollBar({ children }) {
  const modifyChildren = (child) => {
    const className = cx(
        child.props.className,
        "scroll-bar"
    );

    const props = {
        className
    };

    return React.cloneElement(child, props);
}
  const  child = React.Children.only(children);
  return modifyChildren(child);
}
