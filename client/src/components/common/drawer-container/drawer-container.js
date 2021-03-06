import React from "react";
import * as cx from "classnames";
import { isAndroid } from "react-device-detect";

export default function DrawerContainer(props) {

  return (
    <div style={{
        display: "flex",
        width: "100%",
        height: "100%",
        overflowX: "hidden",
        overflowY:  isAndroid ? "scroll" : "auto",
        flexDirection: "column",
        justifyContent: "start"
    }}
    className={cx(props.className)}>
      {props.children}
    </div>
  );
}
