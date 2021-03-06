import React from "react";
import WithLoadingData from "../../hoc-helpers/with-loading-data";
import DrawerAnimContentLoader from "../drawer-anim-content-loader/drawer-anim-content-loader";

function DetailStatus({ data }) {
  return <div style={{
    color: "#",
    fontSize: 15,
  }}>{data.name}</div>;
}

export default WithLoadingData(DetailStatus)(() => (
  <DrawerAnimContentLoader height="18">
    <rect x="0" y="0" rx="5" ry="5" width="200" height="10" />
  </DrawerAnimContentLoader>
));
