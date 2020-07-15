import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import { Grid, TextField, AppBar, Tabs, Tab } from "@material-ui/core";
import { supportedCultures } from "../../../config";

export default function TitleDescription({
  initName,
  setInitName,
  initDescription,
  setInitDescription,
}) {
  const [value, setValue] = React.useState(0);
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const [focused, setFocused] = useState({
      type: '',
      culture: ''
  });

  const [name, setName] = useState(initName);
  const [description, setDescription] = useState(initDescription);

  const tabViews = supportedCultures.map((culture, i) => {
    return <Tab key={i} label={culture.name} />;
  });

  const onNameChange = (newValue, cultureCode) => {
    const oldNameIndex = name.findIndex((p) => p.code === cultureCode);
    if (oldNameIndex !== -1) {
      setName([
        ...name.slice(0, oldNameIndex),
        {
          code: cultureCode,
          value: newValue,
        },
        ...name.slice(oldNameIndex + 1),
      ]);
      setFocused({
        type: "name",
        culture: cultureCode
    })
      setInitName(name);
    }
  };

  const onDescriptionChange = (newValue, cultureCode) => {
    const oldNameIndex = description.findIndex((p) => p.code === cultureCode);
    if (oldNameIndex !== -1) {
      setDescription([
        ...description.slice(0, oldNameIndex),
        {
          code: cultureCode,
          value: newValue,
        },
        ...description.slice(oldNameIndex + 1),
      ]);
      setFocused({
          type: "description",
          culture: cultureCode
      })
      setInitDescription(description);
    }
  };

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
  const panelViews = supportedCultures.map((culture, i) => {
    return (
      <TabPanel key={i} value={value} index={i}>
        <Grid container spacing={3}>
          <Grid item xs="12">
            <TextField
              style={{ width: "100%" }}
              label={`Назва (${culture.name})`}
              value={name[i].value}
              required
              focused={focused.type === 'name' && focused.culture === culture.code}
              onChange={(e) => onNameChange(e.target.value, culture.code)}
            />
          </Grid>
          <Grid item xs="12">
            <TextField
              style={{ width: "100%" }}
              multiline
              value={description[i].value}
              label={`Опис (${culture.name})`}
              focused={focused.type === 'description' && focused.culture === culture.code}
              onChange={(e) =>
                onDescriptionChange(e.target.value, culture.code)
              }
              required
            />
          </Grid>
        </Grid>
      </TabPanel>
    );
  });

  return (
    <Grid item xs={12}>
      <Grid style={{ backgroundColor: "rgba(240, 240, 240, 0.4)" }}>
        <AppBar position="relative">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            {tabViews}
          </Tabs>
        </AppBar>
        {panelViews}
      </Grid>
    </Grid>
  );
}
