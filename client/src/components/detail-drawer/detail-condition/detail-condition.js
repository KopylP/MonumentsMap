import React from "react";
import WithLoadingData from "../../hoc-helpers/with-loading-data";
import DetailDestroyYear from "../detail-destroy-year/detail-destroy-year";
import { Trans } from "react-i18next";
import DrawerAnimContentLoader from "../drawer-anim-content-loader/drawer-anim-content-loader";

function DetailCondition({
  data: {
    condition: { name },
    destroyYear,
    destroyPeriod,
  },
}) {
  return (
    <div style={{fontSize: 15}}>
      <b> <Trans>condition</Trans>: </b>
      {`${name} `}
      {destroyYear != null && destroyPeriod != null && (
        <span style={{ fontWeight: 500 }}>
          (<DetailDestroyYear year={destroyYear} period={destroyPeriod} />)
        </span>
      )}
    </div>
  );
}

export default WithLoadingData(DetailCondition)(() => (
  <DrawerAnimContentLoader height="18">
    <rect x="0" y="0" rx="5" ry="5" width="200" height="10" />
  </DrawerAnimContentLoader>
));
