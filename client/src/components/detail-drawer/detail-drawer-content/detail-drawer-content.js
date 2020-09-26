import React from "react";
import { makeStyles, Grid, Avatar, Divider } from "@material-ui/core";
import DrawerAddress from "../detail-address/detail-address";
import DetailCondition from "../detail-condition/detail-condition";
import DetailStatus from "../detail-status/detail-status";
import DetailTitle from "../detail-title/detail-title";
import DetailDescription from "../detail-description/detail-description";
import DetailProtectionNumber from "../detail-protection-number/detail-protection-number";
import SourceList from "../../common/sources/source-list";

const useStyles = makeStyles((theme) => ({}));

export default function DetailDrawerContent({ monument, ...props }) {
  const styles = useStyles(props);

  return (
    <div style={{ padding: 15 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DrawerAddress
            data={
              monument && { lat: monument.latitude, lng: monument.longitude }
            }
          />
        </Grid>
        <Divider style={{ width: "100%" }} light />
        <Grid item xs={12}>
          <DetailStatus data={monument && monument.status} />
        </Grid>
        <Grid item xs={12}>
          <DetailCondition data={monument}  />
        </Grid>
        {monument && monument.protectionNumber ? (
          <Grid item xs={12}>
            <DetailProtectionNumber data={monument.protectionNumber} />
          </Grid>
        ) : null}
        <Divider style={{ width: "100%" }} light />
        <Grid item xs={12}>
          <DetailTitle
            data={
              monument && {
                name: monument.name,
                year: monument.year,
                period: monument.period,
              }
            }
          />
          <DetailDescription data={monument && monument.description} />
          <SourceList data={monument && monument.sources} />
        </Grid>
      </Grid>
    </div>
  );
}
