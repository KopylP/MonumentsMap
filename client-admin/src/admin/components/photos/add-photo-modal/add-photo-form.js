import React, { useContext, useState, memo } from "react";
import Modal from "@material-ui/core/Modal";
import {
  Paper,
  Fade,
  Backdrop,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneArea } from "material-ui-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import AdminContext from "../../../context/admin-context";
import Period from "../../../../models/period";
import { supportedCultures } from "../../../../config";
import Source from "../../common/source";
import SimpleSubmitForm from "../../common/simple-submit-form";
import { useSnackbar } from "notistack";
import errorNetworkSnackbar from "../../../helpers/error-network-snackbar";

const useStyles = makeStyles((theme) => ({
  scrollBar: {
    position: "absolute",
  },
  paper: {
    width: 850,
    maxHeight: "95%",
    outline: "none",
    boxShadow: theme.shadows[5],
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
    paddingTop: 10,
    overflow: "hidden",
  },
  image: {
    width: "40%",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default memo(function AddPhotoForm({ monumentId, data = null, onComplited = p => p}) {
  const classes = useStyles();
  const { monumentService } = useContext(AdminContext);

  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const defaultSources = [
    {
      title: "",
      sourceLink: "",
    },
  ];
  const [sources, setSources] = useState(data ? data.sources : defaultSources);

  const [file, setFile] = useState(null);

  const getMonumentPhotoFromForm = (values, photoId) => {
    delete values.file;
    const description = [
      ...supportedCultures.map((culture) => ({
        culture: culture.code,
        value: values[culture.code],
      })),
    ];
    supportedCultures.forEach((culture) => {
      delete values[culture.code];
    });
    values.description = description;
    values.sources = sources;
    if (data) {
      values.monumentId = data.monumentId;
    } else {
      values.monumentId = monumentId;
    }
    values.photoId = photoId;
    return values;
  };

  const onCreateMonumentPhoto = (mp, resetForm) => {
    setLoading(false);
    setSources(defaultSources);
    resetForm({ values: "" });
    onComplited();
  };

  const onEditMonumentPhoto = (mp) => {
    onComplited();
    setLoading(false);
  };

  const handleError = (e) => {
    setLoading(false);
    errorNetworkSnackbar(enqueueSnackbar, e.response);
  };

  const submitPhotoForm = (values, { resetForm }) => {
    const getMonumentPhoto = (photoId, id = null) => {
      const monumentPhotoValues = JSON.parse(JSON.stringify(values));
      const monumentPhoto = getMonumentPhotoFromForm(
        monumentPhotoValues,
        photoId
      );
      if (id) {
        monumentPhoto["id"] = id;
      }
      return monumentPhoto;
    };

    setLoading(true);

    if (data == null) {
      monumentService
        .savePhoto(file)
        .then((photo) => {
          const monumentPhoto = getMonumentPhoto(photo.id);
          monumentService
            .createPhotoMonument(monumentPhoto)
            .then((mp) => onCreateMonumentPhoto(mp, resetForm))
            .catch(handleError);
        })
        .catch(handleError);
    } else {
      const monumentPhoto = getMonumentPhoto(data.photoId, data.id);
      monumentService
        .editPhotoMonument(monumentPhoto)
        .then(onEditMonumentPhoto)
        .catch(handleError);
    }
  };

  const initialValues = {
    year: data ? data.year : "",
    period: data ? data.period : "",
    file: "",
  };

  if (data) {
    data.description.forEach((cultureValuePair) => {
      initialValues[cultureValuePair.culture] = cultureValuePair.value;
    });
  } else {
    supportedCultures.forEach((culture) => {
      initialValues[culture.code] = "";
    });
  }

  const validationSchemafileds = {
    year: Yup.number().required("Це поле є обов'язковим"),
    period: Yup.number().required("Це поле є обов'язковим"),
  };

  if (data == null) {
    validationSchemafileds["file"] = Yup.string().required(
      "Додайте фотографію пам'ятки"
    );
  }

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchemafileds),
    onSubmit: submitPhotoForm,
  });

  return (
    <Paper className={classes.paper}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <h3 style={{ width: "100%" }}>
            {data ? "Редагувати" : "Додати"} фотографію
          </h3>
          {data ? (
            <img
              className={classes.image}
              src={monumentService.getPhotoLink(data.photoId)}
            />
          ) : (
            <DropzoneArea
              onChange={(file) => {
                formik.setFieldValue(
                  "file",
                  file.length > 0 ? file[0].path : ""
                );
                setFile(file[0]);
              }}
              acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
              showPreviews={false}
              filesLimit={1}
              name="file"
              showFileNames={true}
              showFileNamesInPreview={true}
              dropzoneText={"Перетягни фотографію"}
              maxFileSize={6000000}
            />
          )}
          <Grid item xs={12}>
            <div style={{ color: "red", fontSize: 14 }}>
              {formik.errors.file}
            </div>
          </Grid>
          <Grid item xs={5}>
            <FormControl style={{ width: "100%" }}>
              <TextField
                id="standard-basic"
                label="Рік фотографії"
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
          <Grid item xs={5}>
            <FormControl style={{ width: "100%" }} required>
              <InputLabel>Період</InputLabel>
              <Select
                labelId="period"
                name="period"
                value={formik.values.period}
                error={formik.touched.period && formik.errors.period}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              >
                <MenuItem value={Period.Year}>Рік</MenuItem>
                <MenuItem value={Period.StartOfCentury}>
                  Початок століття
                </MenuItem>
                <MenuItem value={Period.MiddleOfCentury}>
                  Середина століття
                </MenuItem>
                <MenuItem value={Period.EndOfCentury}>Кінець століття</MenuItem>
                <MenuItem value={Period.Decades}>Десятиліття</MenuItem>
              </Select>
              <FormHelperText>
                {formik.touched.period &&
                  formik.errors.period &&
                  formik.errors.period}
              </FormHelperText>
            </FormControl>
          </Grid>
          {supportedCultures.map((culture, i) => (
            <Grid item xs={12} key={i}>
              <TextField
                style={{ width: "100%", margin: 0 }}
                name={culture.code}
                label={`Опис (${culture.name})`}
                margin="normal"
                value={formik.values[culture.code]}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Source sources={sources} setSources={setSources} />
          </Grid>
          <SimpleSubmitForm loading={loading} showBack={false} />
        </Grid>
      </form>
    </Paper>
  );
});
