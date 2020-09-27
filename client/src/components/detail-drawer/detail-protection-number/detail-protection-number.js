import React from "react";
import WithLoadingData from "../../hoc-helpers/with-loading-data";
import ContentLoader from 'react-content-loader';
import { Trans } from "react-i18next";

function DetailCondition({ data }) {
  return (
    <div>
      <b><Trans>protection number</Trans>: </b>
      {data}
    </div>
  );
}

export default WithLoadingData(DetailCondition)(() => (
  <ContentLoader height="18">
    <rect x="0" y="0" rx="5" ry="5" width="200" height="10" />
  </ContentLoader>
));
