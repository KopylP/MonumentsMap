import { useTheme } from "@material-ui/core/styles";
import React, { useContext } from "react";
import AppContext from "../../../../context/app-context";
import WithLoadingData from "../../../hoc-helpers/with-loading-data";
import DrawerAnimContentLoader from "../../drawer-anim-content-loader/drawer-anim-content-loader";

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
      alt=""
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
      <DrawerAnimContentLoader
        height={theme.detailDrawerHeaderHeight}
        width={theme.detailDrawerWidth}
      >
        <rect
          x="0"
          y="0"
          width={theme.detailDrawerWidth}
          height={theme.detailDrawerHeaderHeight}
        />
      </DrawerAnimContentLoader>
    );
  });
