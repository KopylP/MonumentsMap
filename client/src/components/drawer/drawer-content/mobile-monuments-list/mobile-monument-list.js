import React, { useContext } from "react";
import { List } from "react-virtualized/dist/commonjs/List";
import { AutoSizer } from "react-virtualized/dist/commonjs/List";
import ScrollBar from "../../../common/scroll-bar/scroll-bar";
import AppContext from "../../../../context/app-context";
import MobileMonumentCard from "./mobile-monument-card";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    backgroundColor: "#e4e4e4",
    display: "flex",
  }
});

export default function MobileMonumentList({ monuments }) {
  const { handleMonumentSelected } = useContext(AppContext);
  const classes = useStyle();

  const onMonumentItemClick = (monument) => {
    handleMonumentSelected(monument);
  };

  const renderRow = ({ index, key, style }) => {
    return (
        <MobileMonumentCard
          key={key}
          monument={monuments[index]}
          style={style}
          onClick={() => onMonumentItemClick(monuments[index])}
        />
    );
  };

  return (
    <div className={classes.root}>
      <AutoSizer>
        {({ width, height }) => {
          return (
            <ScrollBar>
              <List
                width={width}
                height={height}
                rowHeight={230}
                rowRenderer={renderRow}
                rowCount={monuments.length}
                overscanRowCount={3}
                style={{ outline: "none", justifyContent: "center", padding: 15, overflowY: "scroll" }}
              />
            </ScrollBar>
          );
        }}
      </AutoSizer>
    </div>
  );
}
