import React, { useContext, useState, useEffect } from "react";
import { Divider, List as MaterialList } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchField from "../../../../common/search-field/search-field";
import ScrollBar from "../../../../common/scroll-bar/scroll-bar";
import MonumentListItem from "./monument-list-item/monument-list-item";
import withMonumentService from "../../../../hoc-helpers/with-monument-service";
import withData from "../../../../hoc-helpers/with-data";
import AppContext from "../../../../../context/app-context";
import { useSnackbar } from "notistack";
import errorNetworkSnackbar from "../../../../helpers/error-network-snackbar";
import {
  AutoSizer,
  List,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 400,
    maxHeight: "70%",
    outline: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "sterch",
  },

  rootList: {
    width: "100%",
    maxWidth: 400,
    height: 600,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 2,
    overflow: "auto",
    boxSizing: "border-box",
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
  const [monuments, setMonuments] = useState(data);
  const {
    monumentService: { toogleMonumentAccepted },
  } = useContext(AppContext);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const errorSnackbar = (status) => {
    errorNetworkSnackbar(enqueueSnackbar, status);
  };

  const onMonumentToogleError = (e, index) => {
    const modifyMonuments = [...monuments];
    modifyMonuments[index].accepted = !modifyMonuments[index].accepted;
    setMonuments(modifyMonuments);
    errorSnackbar(e.response && e.response.status);
  };

  const onAcceptedChange = (index, accepted) => {
    const modifyMonuments = [...monuments];
    modifyMonuments[index].accepted = accepted;
    setMonuments(modifyMonuments);
    toogleMonumentAccepted(monuments[index].id)
      .then()
      .catch((e) => onMonumentToogleError(e, index));
  };

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 80,
    minHeight: 57,
  });

  const rowRender = ({ key, index, style, parent }) => {
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <MonumentListItem
          index={index}
          style={style}
          withDivider={index + 1 !== monuments.length}
          monument={monuments[index]}
          onAcceptedChange={onAcceptedChange}
        />
      </CellMeasurer>
    );
  };

  return (
    <div className={classes.paper}>
      <SearchField className={classes.search} placeholder="Пошук" />
      <MaterialList className={classes.rootList}>
        <AutoSizer>
          {({ width, height }) => {
            return (
              <ScrollBar>
                <List
                  height={height}
                  rowCount={monuments.length}
                  rowHeight={cache.rowHeight}
                  width={width}
                  overscanRowCount={3}
                  rowRenderer={rowRender}
                />
              </ScrollBar>
            );
          }}
        </AutoSizer>
      </MaterialList>
    </div>
  );
}

export default withMonumentService(withData(MonumentList))(
  ({ getAllMonuments }) => ({
    getData: getAllMonuments,
  })
);
