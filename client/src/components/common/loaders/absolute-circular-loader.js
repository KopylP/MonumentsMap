import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function AbsoluteCircularLoader(props) {
    return <div style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
        pointerEvents: "none"
    }}>
        <CircularProgress {...props} />
    </div>
}