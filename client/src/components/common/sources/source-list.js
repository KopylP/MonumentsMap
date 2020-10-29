import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { List } from "react-content-loader";
import WithLoadingData from "../../hoc-helpers/with-loading-data";
import SourceItem from "./source-item";
import { Trans } from 'react-i18next'

function SourceList({ data }) {
  return (
    <div style={{width: "100%"}}>
      <Typography variant="subtitle2" gutterBottom>
        <Trans>Sources</Trans>
      </Typography>
      <ul style={{ marginTop: 0 }}>
        {data.map((source, i) => (
          <SourceItem {...source} key={i} />
        ))}
      </ul>
    </div>
  );
}

export default WithLoadingData(SourceList)(() => (
  <Grid xs={12} item>
    <List />
  </Grid>
));
