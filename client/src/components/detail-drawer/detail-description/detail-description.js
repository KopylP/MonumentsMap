import React from "react";
import { makeStyles } from "@material-ui/core";
import WithLoadingData from "../../hoc-helpers/with-loading-data";
import { List } from "react-content-loader";
import Markdown from "markdown-to-jsx";

const useStyles = makeStyles((theme) => ({
  container: {
    textIndent: 15,
  },
}));

function DetailDescription({ data, ...props }) {
  const styles = useStyles(props);
  return (
    <div className={styles.container}>
      <Markdown>{'\n' + data}</Markdown>
    </div>
  );
}
export default WithLoadingData(DetailDescription)(() => (
  <List style={{ marginTop: 15 }} />
));
