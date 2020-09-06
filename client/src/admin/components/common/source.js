import React, { useState } from "react";
import { Grid, TextField, IconButton } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

export default function Source({ sources, setSources }) {
  const onAddButtonClick = (index) => {
    setSources([
      ...sources,
      {
        title: "",
        sourceLink: "",
      },
    ]);
  };

  const onRemoveButtonClick = (index) => {
    if (sources.length !== 1)
      setSources([...sources.slice(0, index), ...sources.slice(index + 1)]);
    else
      setSources([
        {
          title: "",
          sourceLink: "",
        },
      ]);
  };

  const onChangeSourceTitle = (value, index) => {
    setSources([
      ...sources.slice(0, index),
      {
        title: value,
        sourceLink: sources[index].sourceLink,
      },
      ...sources.slice(index + 1),
    ]);
  };

  const onChangeSourceLink = (value, index) => {
    setSources([
      ...sources.slice(0, index),
      {
        title: sources[index].title,
        sourceLink: value,
      },
      ...sources.slice(index + 1),
    ]);
  };

  const sourceViews = sources.map(({ title, sourceLink }, i) => {
    const addButtonStyles =
      i + 1 === sources.length
        ? {
            visibility: "visible",
            color: "green",
          }
        : {
            visibility: "hidden",
            color: "green",
          };

    return (
      <Grid
        container
        spacing={3}
        justify="space-between"
        alignItems="flex-end"
        key={i}
      >
        <Grid item xs={5}>
          <TextField
            required
            style={{
              width: "100%",
            }}
            id="standard-basic"
            label="Назва ресурсу"
            value={title}
            onChange={(e) => onChangeSourceTitle(e.target.value, i)}
            //   onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            style={{
              width: "100%",
            }}
            id="standard-basic"
            label="Посилання на ресурс (необов'язково)"
            value={sourceLink}
            onChange={(e) => onChangeSourceLink(e.target.value, i)}
          />
        </Grid>
        <Grid item xs={2}>
          <Grid container spacing={1} justify="flex-end">
            <IconButton
              style={{ color: "red" }}
              onClick={() => onRemoveButtonClick(i)}
            >
              <RemoveCircleIcon />
            </IconButton>
            <IconButton
              style={addButtonStyles}
              onClick={() => onAddButtonClick(i)}
            >
              <AddCircleIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    );
  });

  return (
    <Grid xs={12} spacing={3}>
      {sourceViews}
    </Grid>
  );
}
