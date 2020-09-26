import React, { useContext, useState } from "react";
import {
  Paper,
  Grid,
  TextField,
  FormControl,
  AppBar,
  Tabs,
  Tab,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Source from "../../common/source";
import { useFormik } from "formik";
import * as Yup from "yup";
import ScrollBar from "../../../../components/common/scroll-bar/scroll-bar";
import { supportedCultures } from "../../../../config";
import AdminContext from "../../../context/admin-context";
import SimpleSubmitForm from "../../common/simple-submit-form";
import PeriodFormControl from "./forms/period-form-control";
import SelectTypeofMonumentFormControl from "./forms/select-typeof-monument-form-control";
import CityFormControl from "./forms/city-form-control";
import EditMonumentTabPanel from "./ui/edit-monument-tab-panel";

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

export default function CreateEditMonument({ data, acceptForm, loading }) {
  const [tabValue, setTabValue] = React.useState(0);
  const { monumentService } = useContext(AdminContext);

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
  const [sources, setSources] = useState(defaultSources);
  const [defaultCity] = useState("");

  const onFormSubmit = (values, { resetForm }) => {
    const monument = JSON.parse(JSON.stringify(values));
    delete monument.cityName;
    monument.name = name;
    monument.description = description;
    monument.sources = sources;
    delete monument.cityName;
    monument.cityId = monument.city.id;
    delete monument.city;
    if (data) {
      monument.id = data.id;
    }
    acceptForm([monument]);
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
      destroyYear: data ? data.destroyYear : "",
      destroyPeriod: data ? data.destroyPeriod : "",
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
      destroyYear: Yup.number(),
      destroyPeriod: Yup.number(),
    }),
    onSubmit: onFormSubmit,
  });

  const handleCitiesLoad = (cities) => {
    if (data && cities.length > 0) {
      const selectedCityIndex = cities.findIndex(
        (city) => city.id === data.cityId
      );
      formik.setFieldValue("city", cities[selectedCityIndex]);
    }
  };

  const handleTabValueChange = (event, newValue) => {
    setTabValue(newValue);
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

  const panelViews = supportedCultures.map((culture, i) => {
    return (
      <EditMonumentTabPanel
        culture={culture}
        tabValue={tabValue}
        key={i}
        index={i}
        name={name[i].value}
        onNameChange={(e) => onNameChange(e.target.value, culture.code)}
        description={description[i].value}
        onDescriptionChange={(e) =>
          onDescriptionChange(e.target.value, culture.code)
        }
      />
    );
  });

  return (
    <ScrollBar>
      <Paper className={classes.paper}>
        <h2>{data ? "Редагування пам'ятки" : "Нова пам'ятка"}</h2>
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
                <PeriodFormControl
                  label="Період"
                  name="period"
                  required
                  value={formik.values.period}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={formik.touched.period && formik.errors.period}
                  helperText={
                    formik.touched.period &&
                    formik.errors.period &&
                    formik.errors.period
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <CityFormControl
                  onBlur={formik.onBlur}
                  onAutocompliteChange={(_, newValue) =>
                    formik.setFieldValue("city", newValue)
                  }
                  onTextFieldChange={formik.handleChange}
                  autocompliteName="city"
                  value={formik.values.city}
                  textFieldName="cityName"
                  onCitiesLoad={handleCitiesLoad}
                  getCitiesMethod={monumentService.getAllCities}
                  helperText={
                    formik.touched.cityName &&
                    formik.errors.city &&
                    formik.errors.city
                  }
                  error={formik.touched.cityName && formik.errors.city}
                  label="Місто"
                />
              </Grid>
              <Grid item xs={6}>
                <SelectTypeofMonumentFormControl
                  label="Статус пам'ятки"
                  value={formik.values.statusId}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={formik.touched.statusId && formik.errors.statusId}
                  name="statusId"
                  getTypesMethod={monumentService.getAllStatuses}
                  helperText={
                    formik.touched.statusId &&
                    formik.errors.statusId &&
                    formik.errors.statusId
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <SelectTypeofMonumentFormControl
                  label="Стан пам'ятки"
                  value={formik.values.conditionId}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.conditionId && formik.errors.conditionId
                  }
                  name="conditionId"
                  getTypesMethod={monumentService.getAllConditions}
                  helperText={
                    formik.touched.conditionId &&
                    formik.errors.conditionId &&
                    formik.errors.conditionId
                  }
                />
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
              <Grid item xs={6}>
                <FormControl style={{ width: "100%" }}>
                  <TextField
                    id="standard-basic"
                    label="Рік знищення"
                    type="number"
                    name="destroyYear"
                    value={formik.values.destroyYear}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.year && formik.errors.destroyYear}
                    helperText={
                      formik.touched.destroyYear &&
                      formik.errors.destroyYear &&
                      formik.errors.destroyYear
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <PeriodFormControl
                  label="Період знищення"
                  name="destroyPeriod"
                  value={formik.values.destroyPeriod}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.destroyPeriod && formik.errors.destroyPeriod
                  }
                  helperText={
                    formik.touched.destroyPeriod &&
                    formik.errors.destroyPeriod &&
                    formik.errors.destroyPeriod
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Grid style={{ backgroundColor: "rgba(240, 240, 240, 0.4)" }}>
                  <AppBar position="relative">
                    <Tabs
                      value={tabValue}
                      onChange={handleTabValueChange}
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
              <SimpleSubmitForm disableSubmit={false} loading={loading} />
            </Grid>
          </form>
        </div>
      </Paper>
    </ScrollBar>
  );
}
