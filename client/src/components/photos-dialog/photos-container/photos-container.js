import React, { useState, useEffect } from "react";
import clsx from 'clsx';
import {
  Dialog,
  Fade,
  Grid,
  Box,
  makeStyles,
  Hidden,
  Drawer,
} from "@material-ui/core";
import DrawerBackButton from "../../common/drawer-back-button/drawer-back-button";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
  photoListBox: {
    width: theme.detailDrawerWidth,
    marginRight: 5,
  },
  photoBox: {
    width: "100%",
    height: "100%",
  },
  drawer: {
    width: theme.detailDrawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: theme.detailDrawerWidth,
  },
  photoContainer: {
    flexGrow: 1,
    padding: theme.spacing(3),

    border: "1px solid red",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -theme.detailDrawerWidth,
    border: "1px solid red"
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PhotosContainer({ monumentPhotos, onBack }) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }, []);

  const container =
    window !== undefined ? () => window.document.body : undefined;
  return (
    <div className={classes.container}>
          <Drawer
            className={classes.drawer}
            container={container}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div>Hello drawer</div>
          </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
        style={{ backgroundColor: "white" }}
      >
        Hello world
      </main>
    </div>
  );
}
