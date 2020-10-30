import React from "react";
import WithLoadingData from "../../hoc-helpers/with-loading-data";
import { Trans } from "react-i18next";
import DrawerAnimContentLoader from "../drawer-anim-content-loader/drawer-anim-content-loader";

function DetailCondition({ data }) {
  return (
    <div style={{fontSize: 15}}>
      <b><Trans>protection number</Trans>: </b>
      {data}
    </div>
  );
}

export default WithLoadingData(DetailCondition)(() => (
  <DrawerAnimContentLoader height="18">
    <rect x="0" y="0" rx="5" ry="5" width="200" height="10" />
  </DrawerAnimContentLoader>
));
