import React, { useContext, useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import {
  Paper,
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
import Source from "../../common/source";
import { useFormik } from "formik";
import * as Yup from "yup";
import ScrollBar from "../../../../components/common/scroll-bar/scroll-bar";
import Period from "../../../../models/period";
import { supportedCultures } from "../../../../config";
import AdminContext from "../../../context/admin-context";
import SimpleSubmitForm from "../../common/simple-submit-form";
import { useHistory } from "react-router-dom";
import { mergeTwoArraysByKey } from "../../../../components/helpers/array-helpers";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 800,
    margin: "auto",
    maxHeight: "90vh",
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
  scrollBar: {
    position: "absolute",
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

const AutocompleteComponent = ({ citiesAutocompleteProps, formik }) => (
  <Autocomplete
    {...citiesAutocompleteProps}
    id="clear-on-escape"
    clearOnEscape
    name="city"
    value={formik.values.city}
    onBlur={formik.handleBlur}
    onChange={(_, newValue) => formik.setFieldValue("city", newValue)}
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
          formik.touched.cityName && formik.errors.city && formik.errors.city
        }
      />
    )}
  />
);

export default function CreateEditMonument({ data }) {
  const [value, setValue] = React.useState(0);
  const {
    monumentService,
  } = useContext(AdminContext);
  const { goBack } = useHistory();

  const defaultDescription = supportedCultures.map(({ code }) => ({
    culture: code,
    value: "",
  }));

  const defaultSources = data
    ? data.sources
    : [
        {
          title: "",
          sourceLink: "",
        },
      ];

  const defaultName = supportedCultures.map(({ code }) => ({
    culture: code,
    value: "",
  }));

  if (data) {
    data.description.map(({ culture, value }) => {
      const index = defaultDescription.findIndex((p) => p.culture === culture);
      if (index > -1) defaultDescription[index].value = value;
    });
    data.name.map(({ culture, value }) => {
      const index = defaultName.findIndex((p) => p.culture === culture);
      if (index > -1) defaultName[index].value = value;
    });
  }

  const [name, setName] = useState(defaultName);

  const [description, setDescription] = useState(defaultDescription);
  const [cities, setCities] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [sources, setSources] = useState(defaultSources);
  const [defaultCity, setDefaultCity] = useState("");

  const onFormSubmit = (values, { resetForm }) => {
    const monument = JSON.parse(JSON.stringify(values));
    delete monument.cityName;
    monument.name = name;
    monument.description = description;
    monument.sources = sources;
    delete monument.cityName;
    monument.cityId = monument.city.id;
    delete monument.city;
    let saveMethod = monumentService.createMonument;
    if (data) {
      saveMethod = monumentService.editMonument;
      monument.id = data.id;
    }
    saveMethod(monument)
      .then((e) => {
        goBack();
      })
      .catch(); //TODO handle error
  };

  const formik = useFormik({
    initialValues: {
      year: data ? data.year : "",
      period: data ? data.period : "",
      statusId: data ? data.statusId : "",
      conditionId: data ? data.conditionId : "",
      latitude: data ? data.latitude : "",
      longitude: data ? data.longitude : "",
      cityName: "",
      protectionNumber: data ? data.protectionNumber : "",
      city: defaultCity,
    },
    validationSchema: Yup.object({
      year: Yup.number().required("Це поле є обов'язковим"),
      period: Yup.number().required("Це поле є обов'язковим"),
      city: Yup.mixed().required("Це поле є обов'язковим"),
      statusId: Yup.number().required("Це поле є обов'язковим"),
      conditionId: Yup.number().required("Це поле є обов'язковим"),
      latitude: Yup.number().required("Це поле є обов'язковим"),
      longitude: Yup.number().required("Це поле є обов'язковим"),
      protectionNumber: Yup.string(),
    }),
    onSubmit: onFormSubmit,
  });

  useEffect(() => {
    if (data && cities.length > 0) {
      const selectedCityIndex = cities.findIndex(
        (city) => city.id === data.cityId
      );
      formik.setFieldValue("city", cities[selectedCityIndex]);
    }
  }, [cities]);

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

  const tabViews = supportedCultures.map((culture, i) => {
    return <Tab key={i} label={culture.name} />;
  });

  const onNameChange = (newValue, cultureCode) => {
    const oldNameIndex = name.findIndex((p) => p.culture === cultureCode);
    if (oldNameIndex !== -1) {
      setName([
        ...name.slice(0, oldNameIndex),
        {
          culture: cultureCode,
          value: newValue,
        },
        ...name.slice(oldNameIndex + 1),
      ]);
    }
  };

  const onDescriptionChange = (newValue, cultureCode) => {
    const oldNameIndex = description.findIndex(
      (p) => p.culture === cultureCode
    );
    if (oldNameIndex !== -1) {
      setDescription([
        ...description.slice(0, oldNameIndex),
        {
          culture: cultureCode,
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
          <Grid item xs={12}>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label={`Назва (${culture.name})`}
              value={name[i].value}
              onChange={(e) => onNameChange(e.target.value, culture.code)}
            />
          </Grid>
          <Grid item xs={12}>
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
    <ScrollBar>
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
                    <MenuItem value={Period.Year}>Рік</MenuItem>
                    <MenuItem value={Period.StartOfCentury}>
                      Початок століття
                    </MenuItem>
                    <MenuItem value={Period.MiddleOfCentury}>
                      Середина століття
                    </MenuItem>
                    <MenuItem value={Period.EndOfCentury}>
                      Кінець століття
                    </MenuItem>
                    <MenuItem value={Period.Decades}>Десятиліття</MenuItem>
                  </Select>
                  <FormHelperText>
                    {formik.touched.period &&
                      formik.errors.period &&
                      formik.errors.period}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <AutocompleteComponent
                  citiesAutocompleteProps={citiesAutocompleteProps}
                  formik={formik}
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
                    name="conditionId"
                  >
                    {conditions.map((condition) => (
                      <MenuItem key={condition.id} value={condition.id}>
                        {condition.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {formik.touched.conditionId &&
                      formik.errors.conditionId &&
                      formik.errors.conditionId}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl style={{ width: "100%" }}>
                  <TextField
                    required
                    id="standard-basic"
                    name="latitude"
                    label="Широта"
                    type="number"
                    value={formik.values.latitude}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.latitude && formik.errors.latitude}
                    helperText={
                      formik.touched.latitude &&
                      formik.errors.latitude &&
                      formik.errors.latitude
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl style={{ width: "100%" }}>
                  <TextField
                    required
                    id="standard-basic"
                    name="longitude"
                    label="Довгота"
                    type="number"
                    value={formik.values.longitude}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.longitude && formik.errors.longitude}
                    helperText={
                      formik.touched.longitude &&
                      formik.errors.longitude &&
                      formik.errors.longitude
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl style={{ width: "100%" }}>
                  <TextField
                    id="standard-basic"
                    name="protectionNumber"
                    label="Захисний номер"
                    value={formik.values.protectionNumber}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.protectionNumber &&
                      formik.errors.protectionNumber
                    }
                    helperText={
                      formik.touched.protectionNumber &&
                      formik.errors.protectionNumber &&
                      formik.errors.protectionNumber
                    }
                  />
                </FormControl>
              </Grid>
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
              <Grid item xs={12}>
                <Source setSources={setSources} sources={sources} />
              </Grid>
              <SimpleSubmitForm disableSubmit={false} />
            </Grid>
          </form>
        </div>
      </Paper>
    </ScrollBar>
  );
}
