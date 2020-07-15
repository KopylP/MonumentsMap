import React, { useContext, useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import {
  Paper,
  Fade,
  Backdrop,
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  AppBar,
  Tabs,
  Tab,
  Button,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { supportedCultures } from "../../config";
import AppContext from "../../context/app-context";
import Source from "./source/source";
import { useFormik } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 800,
    maxHeight: "90%",
    overflow: "auto",
    outline: "none",
    boxShadow: theme.shadows[5],
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
  },
  root: {
    flexGrow: 1,
    width: "100%",
  },
}));

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

export default function AddModal({ openAddModal, setOpenAddModal }) {
  const [value, setValue] = React.useState(0);
  const { monumentService } = useContext(AppContext);
  const [name, setName] = useState([
    ...supportedCultures.map(({ code }) => ({
      code,
      value: "",
    })),
  ]);
  const [description, setDescription] = useState([
    ...supportedCultures.map(({ code }) => ({
      code,
      value: "",
    })),
  ]);
  const [cities, setCities] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [sources, setSources] = useState([
    {
      title: "",
      sourceLink: "",
    },
  ]);

  const onFormSubmit = (values) => {
    delete values.cityName;
    values.name = name;
    values.description = description;
    values.sources = sources;
    console.log(values);
  };

  const formik = useFormik({
    initialValues: {
      year: "",
      period: "",
      cityId: "",
      statusId: "",
      conditionId: "",
      address: "",
      cityName: ""
    },
    validationSchema: Yup.object({
      year: Yup.number().required("Це поле є обов'язковим"),
      period: Yup.number().required("Це поле є обов'язковим"),
      city: Yup.mixed().required("Це поле є обов'язковим"),
      statusId: Yup.number().required("Це поле є обов'язковим"),
      conditionId: Yup.number().required("Це поле є обов'язковим"),
      address: Yup.string().required("Це поле є обов'язковим"),
    }),
    onSubmit: onFormSubmit
  });

  const onCitiesLoad = (cities) => {
    setCities(cities);
  };

  const onStatusesLoad = (statuses) => {
    setStatuses(statuses);
  };

  const onConditionsLoad = (conditions) => {
    setConditions(conditions);
  };

  const update = () => {
    monumentService.getAllStatuses().then(onStatusesLoad);
    monumentService.getAllConditions().then(onConditionsLoad);
    monumentService.getAllCities().then(onCitiesLoad);
  };

  useEffect(() => {
    update();
  }, [monumentService]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();
  const handleClose = () => {
    setOpenAddModal(false);
  };

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
    }
  };

  const citiesAutocompleteProps = {
    options: cities,
    getOptionLabel: (option) => option.name,
  };

  const panelViews = supportedCultures.map((culture, i) => {
    return (
      <TabPanel key={i} value={value} index={i}>
        <Grid container spacing={3}>
          <Grid item xs="12">
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label={`Назва (${culture.name})`}
              value={name[i].value}
              onChange={(e) => onNameChange(e.target.value, culture.code)}
            />
          </Grid>
          <Grid item xs="12">
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              multiline
              value={description[i].value}
              label={`Опис (${culture.name})`}
              onChange={(e) =>
                onDescriptionChange(e.target.value, culture.code)
              }
            />
          </Grid>
        </Grid>
      </TabPanel>
    );
  });

  return (
    <Modal
      open={openAddModal}
      onClose={handleClose}
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openAddModal}>
        <Paper className={classes.paper}>
          <h2>Нова пам'ятка</h2>
          <div className={classes.root}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <FormControl style={{ width: "100%" }}>
                    <TextField
                      id="standard-basic"
                      label="Рік побудови"
                      type="number"
                      name="year"
                      required
                      value={formik.values.year}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={formik.touched.year && formik.errors.year}
                      helperText={
                        formik.touched.year &&
                        formik.errors.year &&
                        formik.errors.year
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl style={{ width: "100%" }} required>
                    <InputLabel>Період</InputLabel>
                    <Select
                      labelId="period"
                      name="period"
                      value={formik.values.period}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={formik.touched.period && formik.errors.period}
                    >
                      <MenuItem value={2}>Рік</MenuItem>
                      <MenuItem value={1}>Століття</MenuItem>
                      <MenuItem value={3}>Десятиліття</MenuItem>
                    </Select>
                    <FormHelperText>
                      {formik.touched.period &&
                        formik.errors.period &&
                        formik.errors.period}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    {...citiesAutocompleteProps}
                    id="clear-on-escape"
                    clearOnEscape
                    name="city"
                    value={formik.values.city}
                    onBlur={formik.handleBlur}
                    onChange={(_, newValue) =>
                      formik.setFieldValue("city", newValue)
                    }
                    style={{
                      marginTop: -16,
                    }}
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        label="Місто"
                        margin="normal"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        name="cityName"
                        error={formik.touched.cityName && formik.errors.city}
                        helperText={
                          formik.touched.cityName &&
                          formik.errors.city &&
                          formik.errors.city
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl style={{ width: "100%" }} required>
                    <InputLabel>Статус пам'ятки</InputLabel>
                    <Select
                      value={formik.values.statusId}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={formik.touched.statusId && formik.errors.statusId}
                      name="statusId"
                    >
                      {statuses.map((status) => (
                        <MenuItem key={status.id} value={status.id}>
                          {status.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {formik.touched.statusId &&
                        formik.errors.statusId &&
                        formik.errors.statusId}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl style={{ width: "100%" }} required>
                    <InputLabel>Стан пам'ятки</InputLabel>
                    <Select
                      value={formik.values.conditionId}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.conditionId && formik.errors.conditionId
                      }
                      error={formik.touched.year && formik.errors.year}
                      name="conditionId"
                    >
                      {conditions.map((condition) => (
                        <MenuItem key={condition.id} value={condition.id}>
                          {condition.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {formik.touched.year &&
                        formik.errors.year &&
                        formik.errors.year}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl style={{ width: "100%" }}>
                    <TextField
                      required
                      id="standard-basic"
                      name="address"
                      label="Адреса пам'ятки"
                      value={formik.values.address}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={formik.touched.address && formik.errors.address}
                      helperText={
                        formik.touched.address &&
                        formik.errors.address &&
                        formik.errors.address
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Grid style={{ backgroundColor: "rgba(240, 240, 240, 0.4)" }}>
                    <AppBar position="relative">
                      <Tabs
                        // style={{backgroundColor: "#efefef"}}
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
                <Grid item xs={12}>
                  <Source setSources={setSources} sources={sources} />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    style={{ float: "right" }}
                    color="secondary"
                  >
                    Додати
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Paper>
      </Fade>
    </Modal>
  );
}