import { useTheme } from "@material-ui/core/styles";
import React, { useContext } from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../../../../context/app-context";
import WithLoadingData from "../../../hoc-helpers/with-loading-data";

function MonumentDetailImage({
  data,
  onMonumentPhotoClicked,
}) {
  const {
    monumentService: { getPhotoLink },
  } = useContext(AppContext);
  return (
    <img
      src={getPhotoLink(data.photoId, 500)}
      onClick={() => onMonumentPhotoClicked(data)}
      alt={"monument"}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        cursor: "pointer"
      }}
    />
  );
}

export default WithLoadingData(MonumentDetailImage)(() => {
    const theme = useTheme();
    return (
      <ContentLoader
        height={theme.detailDrawerHeaderHeight}
        width={theme.detailDrawerWidth}
      >
        <rect
          x="0"
          y="0"
          width={theme.detailDrawerWidth}
          height={theme.detailDrawerHeaderHeight}
        />
      </ContentLoader>
    );
  });
