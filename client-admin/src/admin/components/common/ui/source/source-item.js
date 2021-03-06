import { Grid, IconButton, TextField } from "@material-ui/core";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import React from "react";
import SourceTypeSelect from "./source-type-select";

export default function SourceItem({
  index,
  last,
  title,
  onChangeSourceTitle,
  onChangeSourceLink,
  onRemoveButtonClick,
  onAddButtonClick,
  sourceLink,
  sourceType,
  onChangeSourceType
}) {
  const addButtonStyles = last
    ? {
        visibility: "visible",
        color: "green",
      }
    : {
        visibility: "hidden",
        color: "green",
      };

  return (
    <Grid container spacing={3} justify="space-between" alignItems="flex-end">
      <Grid item xs={2}>
        <SourceTypeSelect value={sourceType} handleChange={e => onChangeSourceType(e.target.value, index)}/>
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          style={{
            width: "100%",
          }}
          id="standard-basic"
          label="Назва ресурсу"
          value={title}
          onChange={(e) => onChangeSourceTitle(e.target.value, index)}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          style={{
            width: "100%",
          }}
          id="standard-basic"
          label="Посилання на ресурс"
          value={sourceLink}
          onChange={(e) => onChangeSourceLink(e.target.value, index)}
        />
      </Grid>
      <Grid item xs={2}>
        <Grid container spacing={1} justify="flex-end">
          <IconButton
            style={{ color: "red" }}
            onClick={() => onRemoveButtonClick(index)}
          >
            <RemoveCircleIcon />
          </IconButton>
          <IconButton
            style={addButtonStyles}
            onClick={() => onAddButtonClick(index)}
          >
            <AddCircleIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
