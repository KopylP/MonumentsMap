import React from "react";
import { List, AutoSizer } from "react-virtualized";
import ScrollBar from "../../../common/scroll-bar/scroll-bar";
import MobileMonumentCard from "./mobile-monument-card";
import { makeStyles } from "@material-ui/core/styles";
import { changeMonument } from "../../../../actions/detail-monument-actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const useStyle = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    backgroundColor: "#e4e4e4",
    display: "flex",
  },
});

function MobileMonumentList({ monuments, changeMonument }) {
  const classes = useStyle();

  const onMonumentItemClick = (monument) => {
    changeMonument(monument, false);
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
                overscanRowCount={10}
                style={{
                  outline: "none",
                  justifyContent: "center",
                  padding: 15,
                  overflowY: "scroll",
                }}
              />
            </ScrollBar>
          );
        }}
      </AutoSizer>
    </div>
  );
}

const bindDispatchToProps = (dispatch) =>
  bindActionCreators({ changeMonument: changeMonument() }, dispatch);

export default connect(null, bindDispatchToProps)(MobileMonumentList);
