import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import WithLoadingData from "../../hoc-helpers/with-loading-data";
import Markdown from "markdown-to-jsx";
import { ContactMail } from "../../common/contact-mail/contact-mail";
import { Trans } from "react-i18next";
import DrawerAnimList from "../drawer-anim-content-loader/drawer-anim-list";

const useStyles = makeStyles((theme) => ({
  container: {
    textIndent: 15,
  },
}));

function DetailDescription({ data, ...props }) {
  const styles = useStyles(props);
  return (
    <div className={styles.container}>
      {data !== "" && <Markdown>{"\n" + data}</Markdown>}
      {data === "" && (
        <p style={{ textAlign: "center", textIndent: 0 }}>
          <Trans>Know about</Trans>
          <ContactMail />
        </p>
      )}
    </div>
  );
}
export default WithLoadingData(DetailDescription)(() => (
  <DrawerAnimList style={{ marginTop: 15 }} />
));
