import React, { memo, useContext, useEffect, useState } from "react";
import AdminContext from "../../context/admin-context";
import { usePromise } from "../../../hooks/hooks";
import { Paper, Chip, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    chip: {
      margin: theme.spacing(0.5),
    },
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        listStyle: 'none',
        margin: 0,
        padding: 0
      },
  }));
  

export default memo(function TableUserRoles({user}) {
  const classes = useStyles();
  const {
    monumentService: { getUserRoles },
  } = useContext(AdminContext);

  const [roles, error, pending] = usePromise(getUserRoles, null, [user.id]);

  return (
    <React.Fragment>
      {roles !== null && !pending && (
        <ul component="ul" className={classes.root}>
          {roles.map((data) => {
            return (
              <li key={data.name}>
                <Chip
                  label={data.name}
                  className={classes.chip}
                />
              </li>
            );
          })}
        </ul>
      )}
      { pending && <div>Loading...</div> }
    </React.Fragment>
  );
}, (prevProps, newProps) => prevProps.user.id === newProps.user.id);
