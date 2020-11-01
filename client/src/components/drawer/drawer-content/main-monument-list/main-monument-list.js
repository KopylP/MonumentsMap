import React, { memo, useContext } from "react";
import WithLoadingData from "../../../hoc-helpers/with-loading-data";
import { List as MaterialList } from "@material-ui/core/";
import { List, AutoSizer } from "react-virtualized";
import MainMonumentListItem from "./main-monument-list-item/main-monument-list-item";
import ScrollBar from "../../../common/scroll-bar/scroll-bar";
import { connect } from "react-redux";
import { changeMonument } from "../../../../actions/detail-monument-actions";
import { bindActionCreators } from "redux";

function MainMonumentList({ data, changeMonument }) {
  const onMonumentItemClick = (monument) => {
    changeMonument(monument);
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

const bindDispatchToProps = (dispatch) =>
  bindActionCreators({ changeMonument: changeMonument() }, dispatch);

export default WithLoadingData(memo(connect(null, bindDispatchToProps)(MainMonumentList)))(() => (
  <div>loading</div>
));
