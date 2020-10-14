import React, { useContext, useState } from "react";
import { Paper, Grid, AppBar, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Source from "../../common/source";
import { useFormik } from "formik";
import * as Yup from "yup";
import { supportedCultures } from "../../../../config";
import AdminContext from "../../../context/admin-context";
import SimpleSubmitForm from "../../common/simple-submit-form";
import EditMonumentTabPanel from "./ui/edit-monument-tab-panel";
import FormikCity from "./forms/formik/formik-city";
import FormikStatus from "./forms/formik/formik-status";
import FormikCondition from "./forms/formik/formik-condition";
import FormikLatitude from "./forms/formik/formik-latitude";
import FormikLongitude from "./forms/formik/formik-longitude";
import FormikProtectionNumber from "./forms/formik/formik-protection-number";
import FormikDestroyYear from "./forms/formik/formik-destroy-year";
import FormikDestroyPeriod from "./forms/formik/formik-destroy-period";
import FormikPeriod from "./forms/formik/formik-period";
import FormikYear from "./forms/formik/formik-year";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 810,
    margin: "auto",
    maxHeight: "90vh",
    outline: "none",
    boxShadow: theme.shadows[5],
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
    overflow: "auto"
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
  const [destroyFieldsDisabled, setDestroyFieldsDisabled] = useState(false);

  const onFormSubmit = (values) => {
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

    if (destroyFieldsDisabled) {
      monument.destroyYear = null;
      monument.destroyPeriod = null;
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
      destroyYear: Yup.mixed(),
      destroyPeriod: Yup.mixed(),
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

  const handleChangeCondition = (condition) => {
    setDestroyFieldsDisabled(!condition.abbreviation.includes("lost"));
  };

  const handleLoadConditions = (conditions) => {
    if (data) {
      const condition = conditions.find((p) => p.id === data.conditionId);
      setDestroyFieldsDisabled(!condition.abbreviation.includes("lost"));
    }
  };

  return (
      <Paper className={classes.paper}>
        <h2>{data ? "Редагування пам'ятки" : "Нова пам'ятка"}</h2>
        <div className={classes.root}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <FormikYear formik={formik} />
              </Grid>
              <Grid item xs={3}>
                <FormikPeriod formik={formik} />
              </Grid>
              <Grid item xs={6}>
                <FormikCity
                  formik={formik}
                  onCitiesLoad={handleCitiesLoad}
                  getCitiesMethod={monumentService.getAllCities}
                />
              </Grid>
              <Grid item xs={6}>
                <FormikStatus
                  formik={formik}
                  getTypesMethod={monumentService.getAllStatuses}
                />
              </Grid>
              <Grid item xs={6}>
                <FormikCondition
                  formik={formik}
                  getTypesMethod={monumentService.getAllConditions}
                  onChangeCondition={handleChangeCondition}
                  onLoadConditions={handleLoadConditions}
                />
              </Grid>
              <Grid item xs={3}>
                <FormikLatitude formik={formik} />
              </Grid>
              <Grid item xs={3}>
                <FormikLongitude formik={formik} />
              </Grid>
              <Grid item xs={6}>
                <FormikProtectionNumber formik={formik} />
              </Grid>
              <Grid item xs={6}>
                <FormikDestroyYear
                  formik={formik}
                  disabled={destroyFieldsDisabled}
                />
              </Grid>
              <Grid item xs={6}>
                <FormikDestroyPeriod
                  formik={formik}
                  disabled={destroyFieldsDisabled}
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
  );
}
