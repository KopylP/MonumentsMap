import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import DetailYear from "../detail-year/detail-year";
import WithLoadingData from "../../hoc-helpers/with-loading-data";
import ContentLoader from "react-content-loader";
import DetailCopyIcon from "./detail-copy-icon";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    color: "white",
    backgroundColor: theme.palette.secondary.main,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 15,
  },
  h4: {
    margin: 0,
  },
}));

function DetailTitle({ data, ...props }) {
  const styles = useStyles(props);

  return (
    <div className={styles.container}>
      <Avatar className={styles.avatar}>
        <AccountBalanceIcon />
      </Avatar>
      <div className={styles.titleContainer}>
        <h4 className={styles.h4}>{data.name}</h4>
        <DetailYear year={data && data.year} period={data && data.period} />
      </div>
      <DetailCopyIcon />
    </div>
  );
}

export default WithLoadingData(DetailTitle)(() => (
  <ContentLoader
    speed={2}
    width={300}
    height={40}
    viewBox="0 0 300 40"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="48" y="8" rx="3" ry="3" width="200" height="6" />
    <rect x="48" y="26" rx="3" ry="3" width="150" height="6" />
    <circle cx="20" cy="20" r="20" />
  </ContentLoader>
));
