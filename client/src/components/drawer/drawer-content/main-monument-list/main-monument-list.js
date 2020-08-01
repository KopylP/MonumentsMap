import React from "react";
import WithLoadingData from "../../../hoc-helpers/with-loading-data";
import { List } from "@material-ui/core";
import MainMonumentListItem from "./main-monument-list-item/main-monument-list-item";

function MainMonumentList({ data }) {
  return (
    <List style={{ width: "100%", height: "100%", boxSizing: "border-box" }}>
      { data.map((monument, i) => <MainMonumentListItem key={i} monument={monument}/>) }
    </List>
  );
}

export default WithLoadingData(MainMonumentList)(() => <div>loading</div>);
