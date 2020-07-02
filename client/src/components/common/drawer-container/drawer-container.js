import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { findByLabelText } from "@testing-library/react";

export default function DrawerContainer(props) {
  return (
    <div style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "start"
    }}>
      {props.children}
    </div>
  );
}
