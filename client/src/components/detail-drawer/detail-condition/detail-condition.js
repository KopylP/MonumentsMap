import React from "react";
import WithLoadingData from "../../hoc-helpers/with-loading-data";
import ContentLoader from "react-content-loader";
import DetailDestroyYear from "../detail-destroy-year/detail-destroy-year";
import { Trans } from "react-i18next";

function DetailCondition({
  data: {
    condition: { name },
    destroyYear,
    destroyPeriod,
  },
}) {
  return (
    <div>
      <b> <Trans>condition</Trans>: </b>
      {`${name} `}
      {destroyYear && destroyPeriod && (
        <span style={{ fontWeight: 500 }}>
          (<DetailDestroyYear year={destroyYear} period={destroyPeriod} />)
        </span>
      )}
    </div>
  );
}

export default WithLoadingData(DetailCondition)(() => (
  <ContentLoader height="18">
    <rect x="0" y="0" rx="5" ry="5" width="200" height="10" />
  </ContentLoader>
));
