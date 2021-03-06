import React from "react";
import { Grid } from "@material-ui/core";
import SourceItem from "./source-item";

export default function Source({ sources, setSources }) {
  const onAddButtonClick = (index) => {
    setSources([
      ...sources,
      {
        title: "",
        sourceLink: "",
        sourceType: ""
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
          sourceType: ""
        },
      ]);
  };

  const onChangeSourceTitle = (value, index) => {
    setSources([
      ...sources.slice(0, index),
      {
        title: value,
        sourceLink: sources[index].sourceLink,
        sourceType: sources[index].sourceType
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
        sourceType: sources[index].sourceType
      },
      ...sources.slice(index + 1),
    ]);
  };

  const onChangeSourceType = (value, index) => {
    setSources([
      ...sources.slice(0, index),
      {
        title: sources[index].title,
        sourceLink: sources[index].sourceLink,
        sourceType: value
      },
      ...sources.slice(index + 1),
    ]);
  };

  const sourceViews = sources.map(({ title, sourceLink, sourceType }, i) => {
    const last = i + 1 === sources.length;

    return (
      <SourceItem
        onChangeSourceTitle={onChangeSourceTitle}
        onChangeSourceLink={onChangeSourceLink}
        onRemoveButtonClick={onRemoveButtonClick}
        onAddButtonClick={onAddButtonClick}
        onChangeSourceType={onChangeSourceType}
        title={title}
        sourceLink={sourceLink}
        sourceType={sourceType}
        last={last}
        key={i}
        index={i}
      />
    );
  });

  return (
    <Grid xs={12} spacing={3}>
      {sourceViews}
    </Grid>
  );
}
