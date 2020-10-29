import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import * as cx from "classnames";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    searchFieldContainer: {
        display: "-webkit-flex",
        alignItems: "center",
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 15,
        paddingRight: 5,
        backgroundColor: "white",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#ddd",
        boxSizing: "border-box"
    },
  searchField: {
      width: "100%",
      borderWidth: 0,
      padding: 0,
      margin: 0,
      marginRight: 5,
      caretColor: theme.palette.secondary.main,
      fontSize: 15,
      '&:focus': {
          borderWidth: 0,
          outline: "none"
      }
  },
  searchIcon: {
      color: theme.palette.secondary.main
  }
}));

export default function SearchField({ className = {}, placeholder = "" }) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={cx(classes.searchFieldContainer, className)}>
      <input className={classes.searchField} placeholder={placeholder}/>
      <SearchIcon className={classes.searchIcon}/>
    </div>
  );
}
