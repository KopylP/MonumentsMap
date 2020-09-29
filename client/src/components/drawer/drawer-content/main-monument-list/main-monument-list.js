import React, { memo, useContext } from "react";
import WithLoadingData from "../../../hoc-helpers/with-loading-data";
import { List as MaterialList } from "@material-ui/core";
import { List, AutoSizer } from "react-virtualized";
import MainMonumentListItem from "./main-monument-list-item/main-monument-list-item";
import ScrollBar from "../../../common/scroll-bar/scroll-bar";
import AppContext from "../../../../context/app-context";

function MainMonumentList({ data }) {
  const { handleMonumentSelected } = useContext(AppContext);

  const onMonumentItemClick = (monument) => {
    handleMonumentSelected(monument);
  };

  const renderRow = ({ index, key, style }) => {
    return (
      <MainMonumentListItem
        key={key}
        monument={data[index]}
        style={style}
        onClick={() => onMonumentItemClick(data[index])}
      />
    );
  };

  return (
    <MaterialList
      style={{
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <AutoSizer>
        {({ width, height }) => {
          return (
            <ScrollBar>
              <List
                width={width}
                height={height}
                rowHeight={72}
                rowRenderer={renderRow}
                rowCount={data.length}
                overscanRowCount={3}
                style={{ outline: "none" }}
              />
            </ScrollBar>
          );
        }}
      </AutoSizer>
    </MaterialList>
  );
}

export default WithLoadingData(memo(MainMonumentList))(() => (
  <div>loading</div>
));
