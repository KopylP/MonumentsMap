import React, { useContext, useState, useEffect } from "react";
import { List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "react-perfect-scrollbar/dist/css/styles.css";
import SearchField from "../../../../common/search-field/search-field";
import ScrollBar from "../../../../common/scroll-bar/scroll-bar";
import MonumentListItem from "./monument-list-item/monument-list-item";
import withMonumentService from "../../../../hoc-helpers/with-monument-service";
import withData from "../../../../hoc-helpers/with-data";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 360,
    maxHeight: "70%",
    outline: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "sterch",
  },
  listContainer: {
    borderRadius: 5,
    display: "block",
    padding: 2,
    backgroundColor: "white",
  },
  rootList: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,

    overflow: "auto",
    maxHeight: 600,
  },
  listItemText: {
    maxWidth: 240,
  },
  search: {
    marginBottom: 15,
  },
}));

function MonumentList({ data }) {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <SearchField className={classes.search} placeholder="Пошук"/>
      <div className={classes.listContainer}>
        <ScrollBar>
          <List dense className={classes.rootList}>
            {data.map((monument) => (
              <MonumentListItem monument={monument}/>
            ))}
          </List>
        </ScrollBar>
      </div>
    </div>
  );
}

export default withMonumentService(withData(MonumentList))(
  ({ getAllMonuments }) => ({
    getData: getAllMonuments,
  })
);