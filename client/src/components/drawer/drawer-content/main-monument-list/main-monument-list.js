import React from "react";
import WithLoadingData from "../../../hoc-helpers/with-loading-data";
import { List as MaterialList } from "@material-ui/core";
import { List, AutoSizer } from "react-virtualized";
import MainMonumentListItem from "./main-monument-list-item/main-monument-list-item";
import ScrollBar from "../../../common/scroll-bar/scroll-bar";

function MainMonumentList({ data }) {
  const renderRow = ({ index, key, style }) => {
    return (
      <MainMonumentListItem key={key} monument={data[index]} style={style} />
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
                style={{outline: "none"}}
              />
            </ScrollBar>
          );
        }}
      </AutoSizer>
    </MaterialList>
  );
}

export default WithLoadingData(MainMonumentList)(() => <div>loading</div>);
