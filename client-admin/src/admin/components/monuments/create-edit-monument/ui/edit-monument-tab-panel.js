import { Box, Grid, TextField, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

export default function EditMonumentTabPanel({ culture, name, description, tabValue, onNameChange, onDescriptionChange, index }) {
  return (
    <TabPanel value={tabValue} index={index}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            style={{ width: "100%" }}
            id="standard-basic"
            label={`Назва (${culture.name})`}
            value={name}
            onChange={onNameChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            style={{ width: "100%" }}
            id="standard-basic"
            multiline
            value={description}
            label={`Опис (${culture.name})`}
            onChange={onDescriptionChange}
          />
        </Grid>
      </Grid>
    </TabPanel>
  );
}
