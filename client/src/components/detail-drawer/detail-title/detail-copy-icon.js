import React, { useRef } from "react";
import ShareIcon from '@material-ui/icons/Share';
import { IconButton, makeStyles } from "@material-ui/core";
import { useRouteMatch } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "auto",
    marginRight: -10,
    alignItems: "center",
  },
  icon: {
    color: theme.palette.secondary.main,
  },
}));

export default function DetailCopyIcon() {
  const classes = useStyles();
  const { url } = useRouteMatch();
  const host = window.location.origin;
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  return (
    <CopyToClipboard
      text={`${host}${url}`}
      onCopy={() => enqueueSnackbar(t("Link copied"), { variant: "success", autoHideDuration: 1000 })}
    >
      <IconButton className={classes.root}>
        <ShareIcon fontSize="small" className={classes.icon} />
      </IconButton>
    </CopyToClipboard>
  );
}
