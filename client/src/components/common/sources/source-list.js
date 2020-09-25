import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { List } from "react-content-loader";
import WithLoadingData from "../../hoc-helpers/with-loading-data";
import SourceItem from "./source-item";

function SourceList({ data }) {
  return (
    <Grid xs={12} item>
      <Typography gutt variant="subtitle2" gutterBottom>
        Джерела
      </Typography>
      <ul style={{marginTop: 0}}>
        {data.map((source) => (
          <SourceItem {...source} key={source.id} />
        ))}
      </ul>
    </Grid>
  );
}

export default WithLoadingData(SourceList)(() => <Grid xs={12} item><List /></Grid>);
