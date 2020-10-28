import React from "react";
import loader from "./loader.svg";

export default function AppLoader({ show }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 3000,
        pointerEvents: show? "auto": "none",
        backgroundColor: "white",
        transition: "opacity 1s",
        opacity: show ? 1 : 0
      }}
    >
        <img src={loader} style={{maxWidth: "90%"}}/>
    </div>
  );
}
