import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { contactMail } from "../../../config";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.secondary.main,
    fontWeight: 500,
  },
}));

export function ContactMail() {
  const styles = useStyles();
  return (
    <a href={`mailto:${contactMail}}`} className={styles.root}>
      {contactMail}
    </a>
  );
}
