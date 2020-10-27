import React from "react";
import WithLoadingData from "../../hoc-helpers/with-loading-data";
import ContentLoader from "react-content-loader";

function DetailStatus({ data }) {
  return <div style={{
    color: "#",
    fontSize: 15,
  }}>{data.name}</div>;
}

export default WithLoadingData(DetailStatus)(() => (
  <ContentLoader height="18">
    <rect x="0" y="0" rx="5" ry="5" width="200" height="10" />
  </ContentLoader>
));
